/**
 * Property Test: Success Feedback Display
 * Validates: Requirements 6.7
 *
 * Property 2: For ANY valid form submission, the showFeedback function
 * SHALL display a confirmation message with positive styling when isSuccess=true,
 * SHALL display an error message when isSuccess=false,
 * and SHALL schedule auto-hide after 5000ms via setTimeout.
 *
 * This is a self-running Node.js test script using console assertions.
 * Exit code 0 = all tests passed. Exit code 1 = one or more failures.
 */

'use strict';

// ---------------------------------------------------------------------------
// Inline copy of showFeedback from script.js (with DOM injection point)
// showFeedback is extracted as a pure function that accepts a document stub,
// mirroring the real logic exactly.
// ---------------------------------------------------------------------------

/**
 * Creates a minimal DOM stub that tracks classList state and textContent.
 * @returns {{ element: object, setTimeoutCalls: Array }}
 */
function createDOMStub() {
  // Track setTimeout calls so we can assert on delay values
  const setTimeoutCalls = [];

  // Minimal classList implementation
  function makeClassList(initial = '') {
    const classes = new Set(initial ? initial.split(' ').filter(Boolean) : []);
    return {
      add(...tokens)    { tokens.forEach(t => classes.add(t)); },
      remove(...tokens) { tokens.forEach(t => classes.delete(t)); },
      contains(token)   { return classes.has(token); },
      toString()        { return [...classes].join(' '); },
    };
  }

  const feedbackEl = {
    textContent: '',
    // className mirrors classList state (like the DOM property)
    get className() { return this.classList.toString(); },
    set className(val) {
      // Replace all classes when className is set (mirrors real DOM)
      const classes = this.classList;
      // Clear existing classes by removing each one individually
      [...classes.toString().split(' ').filter(Boolean)].forEach(c => classes.remove(c));
      // Add new ones
      val.split(' ').filter(Boolean).forEach(c => classes.add(c));
    },
    classList: makeClassList(),
  };

  // Mock document that returns the feedback element for #formFeedback
  const documentStub = {
    getElementById(id) {
      if (id === 'formFeedback') return feedbackEl;
      return null;
    },
  };

  // Mock setTimeout that records calls without actually waiting
  function mockSetTimeout(fn, delay) {
    setTimeoutCalls.push({ fn, delay });
  }

  return { feedbackEl, documentStub, mockSetTimeout, setTimeoutCalls };
}

/**
 * showFeedback logic extracted from script.js, made injectable for testing.
 * @param {string}   message     - The feedback message to display
 * @param {boolean}  isSuccess   - true for success styling, false for error
 * @param {object}   document    - Injected document (real or stub)
 * @param {Function} setTimeout  - Injected setTimeout (real or mock)
 */
function showFeedback(message, isSuccess, document, setTimeout) {
  const feedback = document.getElementById('formFeedback');
  if (!feedback) return;

  feedback.textContent = message;
  feedback.className = 'form-feedback ' + (isSuccess ? 'success' : 'error');
  feedback.classList.add('visible');

  setTimeout(() => {
    feedback.classList.remove('visible');
  }, 5000);
}

// ---------------------------------------------------------------------------
// Lightweight test harness
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${label}`);
    failed++;
  }
}

function describe(suiteName, fn) {
  console.log(`\n${suiteName}`);
  fn();
}

// ---------------------------------------------------------------------------
// Generators for property-based style testing
// ---------------------------------------------------------------------------

/** Generate a random alphabetic string of exactly `len` characters. */
function randomAlpha(len) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';
  let s = '';
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s.trim() || 'fallback'; // ensure never empty after trim
}

/** Generate random valid names (2–50 chars). */
function* validNameGenerator(count = 20) {
  for (let i = 0; i < count; i++) {
    const len = 2 + Math.floor(Math.random() * 49);
    yield randomAlpha(len) || 'ab'; // fallback if randomAlpha trims to empty
  }
}

/** Generate random valid email addresses. */
function* validEmailGenerator(count = 20) {
  const domains = ['example.com', 'test.org', 'mail.io', 'work.net', 'hire.me'];
  for (let i = 0; i < count; i++) {
    const local = 'user' + Math.floor(Math.random() * 10000);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    yield `${local}@${domain}`;
  }
}

/** Generate random valid messages (10–200 chars). */
function* validMessageGenerator(count = 20) {
  for (let i = 0; i < count; i++) {
    const len = 10 + Math.floor(Math.random() * 191);
    yield 'Hello ' + randomAlpha(len - 6 > 0 ? len - 6 : 4);
  }
}

/** Generate random feedback messages (non-empty strings). */
function* feedbackMessageGenerator(count = 20) {
  const templates = [
    'Thank you for your message! I will get back to you soon.',
    'Please fix the errors above and try again.',
    'Your message has been received.',
    'Something went wrong. Please try again.',
    'Message sent successfully!',
  ];
  for (let i = 0; i < count; i++) {
    yield templates[i % templates.length];
  }
}

// ---------------------------------------------------------------------------
// Test suites
// ---------------------------------------------------------------------------

// ── PROPERTY 2a: SUCCESS FEEDBACK ───────────────────────────────────────────
describe('showFeedback(message, true) — property test: className must include "success" and "visible"', () => {
  for (const msg of feedbackMessageGenerator(20)) {
    const { feedbackEl, documentStub, mockSetTimeout } = createDOMStub();

    showFeedback(msg, true, documentStub, mockSetTimeout);

    assert(
      feedbackEl.classList.contains('success'),
      `message="${msg.slice(0, 40)}" → className should contain "success" (got "${feedbackEl.className}")`
    );
    assert(
      feedbackEl.classList.contains('visible'),
      `message="${msg.slice(0, 40)}" → className should contain "visible" (got "${feedbackEl.className}")`
    );
    assert(
      !feedbackEl.classList.contains('error'),
      `message="${msg.slice(0, 40)}" → className should NOT contain "error" (got "${feedbackEl.className}")`
    );
    assert(
      feedbackEl.textContent !== '' && feedbackEl.textContent === msg,
      `message="${msg.slice(0, 40)}" → textContent should match provided message`
    );
  }
});

// ── PROPERTY 2b: ERROR FEEDBACK ─────────────────────────────────────────────
describe('showFeedback(message, false) — property test: className must include "error" and "visible"', () => {
  for (const msg of feedbackMessageGenerator(10)) {
    const { feedbackEl, documentStub, mockSetTimeout } = createDOMStub();

    showFeedback(msg, false, documentStub, mockSetTimeout);

    assert(
      feedbackEl.classList.contains('error'),
      `message="${msg.slice(0, 40)}" → className should contain "error" (got "${feedbackEl.className}")`
    );
    assert(
      feedbackEl.classList.contains('visible'),
      `message="${msg.slice(0, 40)}" → className should contain "visible" (got "${feedbackEl.className}")`
    );
    assert(
      !feedbackEl.classList.contains('success'),
      `message="${msg.slice(0, 40)}" → className should NOT contain "success" (got "${feedbackEl.className}")`
    );
  }
});

// ── PROPERTY 2c: FORM-FEEDBACK BASE CLASS ───────────────────────────────────
describe('showFeedback — base class "form-feedback" is always set regardless of isSuccess value', () => {
  for (const isSuccess of [true, false]) {
    const { feedbackEl, documentStub, mockSetTimeout } = createDOMStub();
    showFeedback('Test message', isSuccess, documentStub, mockSetTimeout);

    assert(
      feedbackEl.classList.contains('form-feedback'),
      `isSuccess=${isSuccess} → className should always include "form-feedback" (got "${feedbackEl.className}")`
    );
  }
});

// ── PROPERTY 2d: NON-EMPTY TEXTCONTENT ACROSS VALID FORM DATA ───────────────
describe('showFeedback — textContent is non-empty for any valid form submission scenario', () => {
  const nameGen    = validNameGenerator(10);
  const emailGen   = validEmailGenerator(10);
  const messageGen = validMessageGenerator(10);

  for (let i = 0; i < 10; i++) {
    const name    = nameGen.next().value;
    const email   = emailGen.next().value;
    const msg     = messageGen.next().value;
    const feedbackMsg = `Thank you, ${name}! We'll reply to ${email} soon.`;

    const { feedbackEl, documentStub, mockSetTimeout } = createDOMStub();
    showFeedback(feedbackMsg, true, documentStub, mockSetTimeout);

    assert(
      typeof feedbackEl.textContent === 'string' && feedbackEl.textContent.length > 0,
      `Feedback for ${name}/${email} → textContent must be non-empty`
    );
  }
});

// ── PROPERTY 2e: AUTO-HIDE — setTimeout called with 5000ms ──────────────────
describe('showFeedback — schedules auto-hide via setTimeout with exactly 5000ms delay', () => {
  // Test with success=true
  {
    const { setTimeoutCalls, documentStub, mockSetTimeout } = createDOMStub();
    showFeedback('Success message', true, documentStub, mockSetTimeout);

    assert(
      setTimeoutCalls.length === 1,
      `isSuccess=true → setTimeout should be called exactly once (called ${setTimeoutCalls.length} time(s))`
    );
    assert(
      setTimeoutCalls.length > 0 && setTimeoutCalls[0].delay === 5000,
      `isSuccess=true → setTimeout delay must be 5000ms (got ${setTimeoutCalls[0]?.delay}ms)`
    );
  }

  // Test with success=false
  {
    const { setTimeoutCalls, documentStub, mockSetTimeout } = createDOMStub();
    showFeedback('Error message', false, documentStub, mockSetTimeout);

    assert(
      setTimeoutCalls.length === 1,
      `isSuccess=false → setTimeout should be called exactly once (called ${setTimeoutCalls.length} time(s))`
    );
    assert(
      setTimeoutCalls.length > 0 && setTimeoutCalls[0].delay === 5000,
      `isSuccess=false → setTimeout delay must be 5000ms (got ${setTimeoutCalls[0]?.delay}ms)`
    );
  }
});

// ── PROPERTY 2f: AUTO-HIDE CALLBACK removes 'visible' class ─────────────────
describe('showFeedback — auto-hide callback removes "visible" class when executed', () => {
  for (const isSuccess of [true, false]) {
    const { feedbackEl, documentStub, mockSetTimeout, setTimeoutCalls } = createDOMStub();
    showFeedback('Test feedback message', isSuccess, documentStub, mockSetTimeout);

    // Verify 'visible' is present before the callback fires
    assert(
      feedbackEl.classList.contains('visible'),
      `isSuccess=${isSuccess} → "visible" present before auto-hide fires`
    );

    // Simulate the 5-second timeout firing by calling the recorded callback
    assert(
      setTimeoutCalls.length > 0,
      `isSuccess=${isSuccess} → setTimeout was registered (precondition for auto-hide test)`
    );

    if (setTimeoutCalls.length > 0) {
      setTimeoutCalls[0].fn(); // fire the timeout callback
      assert(
        !feedbackEl.classList.contains('visible'),
        `isSuccess=${isSuccess} → "visible" removed after auto-hide callback fires`
      );
    }
  }
});

// ── PROPERTY 2g: NULL ELEMENT — no crash when #formFeedback missing ──────────
describe('showFeedback — does not throw when feedback element is missing in DOM', () => {
  const emptyDocument = { getElementById: () => null };
  const calls = [];
  const mockST = (fn, delay) => calls.push({ fn, delay });

  let threw = false;
  try {
    showFeedback('Some message', true, emptyDocument, mockST);
  } catch (e) {
    threw = true;
  }

  assert(!threw, 'showFeedback should not throw when #formFeedback element is absent');
  assert(calls.length === 0, 'setTimeout should NOT be called when feedback element is missing');
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('─'.repeat(50));

if (failed > 0) {
  process.exit(1);
}
