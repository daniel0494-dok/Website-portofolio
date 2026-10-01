/**
 * Property Test: Form Validation Correctness
 * Validates: Requirements 6.6
 *
 * Property 1: For ANY combination of field values, the validateField function
 * SHALL return { valid: false, error: <non-empty string> } for invalid inputs,
 * and { valid: true, error: '' } for valid inputs.
 *
 * This is a self-running Node.js test script using console assertions.
 * Exit code 0 = all tests passed. Exit code 1 = one or more failures.
 */

'use strict';

// ---------------------------------------------------------------------------
// Inline copy of validateField from script.js (pure logic, no DOM dependency)
// ---------------------------------------------------------------------------
function validateField(field, value) {
  if (field === 'name') {
    if (!value || !value.trim()) {
      return { valid: false, error: 'Name is required' };
    }
    if (value.trim().length < 2) {
      return { valid: false, error: 'Name must be at least 2 characters' };
    }
    return { valid: true, error: '' };
  }

  if (field === 'email') {
    if (!value || !value.trim()) {
      return { valid: false, error: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    return { valid: true, error: '' };
  }

  if (field === 'message') {
    if (!value || !value.trim()) {
      return { valid: false, error: 'Message is required' };
    }
    if (value.trim().length < 10) {
      return { valid: false, error: 'Message must be at least 10 characters' };
    }
    return { valid: true, error: '' };
  }

  return { valid: true, error: '' };
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
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let s = '';
  for (let i = 0; i < len; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

/** Generate random valid names of length 2..50. */
function* validNameGenerator(count = 20) {
  for (let i = 0; i < count; i++) {
    const len = 2 + Math.floor(Math.random() * 49); // 2–50
    yield randomAlpha(len);
  }
}

/** Generate random valid email addresses. */
function* validEmailGenerator(count = 20) {
  const domains = ['example.com', 'test.org', 'mail.io', 'foo.net'];
  for (let i = 0; i < count; i++) {
    const local = randomAlpha(3 + Math.floor(Math.random() * 8));
    const domain = domains[Math.floor(Math.random() * domains.length)];
    yield `${local}@${domain}`;
  }
}

/** Generate random valid messages of length 10..200. */
function* validMessageGenerator(count = 20) {
  for (let i = 0; i < count; i++) {
    const len = 10 + Math.floor(Math.random() * 191); // 10–200
    yield randomAlpha(len);
  }
}

// ---------------------------------------------------------------------------
// Test suites
// ---------------------------------------------------------------------------

// ── NAME FIELD ──────────────────────────────────────────────────────────────
describe('Name validation — invalid inputs (property: must return valid=false with non-empty error)', () => {
  const invalidInputs = [
    '',           // empty string
    ' ',          // single space
    '   ',        // multiple spaces (whitespace-only)
    '\t',         // tab
    '\n',         // newline
    'a',          // single character (below minimum)
  ];

  for (const input of invalidInputs) {
    const result = validateField('name', input);
    assert(
      result.valid === false,
      `name="${JSON.stringify(input)}" → valid should be false (got ${result.valid})`
    );
    assert(
      typeof result.error === 'string' && result.error.length > 0,
      `name="${JSON.stringify(input)}" → error message should be non-empty (got "${result.error}")`
    );
  }
});

describe('Name validation — boundary: exactly 2 characters (must be valid)', () => {
  const result = validateField('name', 'ab');
  assert(result.valid === true,  'name="ab" (len=2) → valid should be true');
  assert(result.error === '',    'name="ab" (len=2) → error should be empty string');
});

describe('Name validation — valid inputs property test (all should return valid=true, empty error)', () => {
  for (const name of validNameGenerator(20)) {
    const result = validateField('name', name);
    assert(
      result.valid === true,
      `name="${name}" (len=${name.length}) → valid should be true`
    );
    assert(
      result.error === '',
      `name="${name}" (len=${name.length}) → error should be empty string`
    );
  }
});

// ── EMAIL FIELD ─────────────────────────────────────────────────────────────
describe('Email validation — invalid inputs (property: must return valid=false with non-empty error)', () => {
  const invalidInputs = [
    '',                   // empty
    '   ',                // whitespace-only
    'notanemail',         // missing @
    'missing@',           // missing domain
    '@nodomain.com',      // missing local part (has @ but empty local)
    'two@@domain.com',    // double @
    'spaces in@email.com',// space in local part
    'user@',              // missing domain entirely
    'user@domain',        // missing TLD
  ];

  for (const input of invalidInputs) {
    const result = validateField('email', input);
    assert(
      result.valid === false,
      `email="${input}" → valid should be false (got ${result.valid})`
    );
    assert(
      typeof result.error === 'string' && result.error.length > 0,
      `email="${input}" → error message should be non-empty (got "${result.error}")`
    );
  }
});

describe('Email validation — valid inputs property test (all should return valid=true, empty error)', () => {
  for (const email of validEmailGenerator(20)) {
    const result = validateField('email', email);
    assert(
      result.valid === true,
      `email="${email}" → valid should be true`
    );
    assert(
      result.error === '',
      `email="${email}" → error should be empty string`
    );
  }
});

// ── MESSAGE FIELD ────────────────────────────────────────────────────────────
describe('Message validation — invalid inputs (property: must return valid=false with non-empty error)', () => {
  const invalidInputs = [
    '',          // empty
    ' ',         // whitespace-only
    '   \t\n',   // various whitespace
    'short',     // 5 chars — below minimum
    'tooshort!', // 9 chars — one below minimum
  ];

  for (const input of invalidInputs) {
    const result = validateField('message', input);
    assert(
      result.valid === false,
      `message="${JSON.stringify(input)}" → valid should be false (got ${result.valid})`
    );
    assert(
      typeof result.error === 'string' && result.error.length > 0,
      `message="${JSON.stringify(input)}" → error message should be non-empty (got "${result.error}")`
    );
  }
});

describe('Message validation — boundary: exactly 10 characters (must be valid)', () => {
  const tenChars = 'abcdefghij'; // exactly 10 non-whitespace chars
  const result = validateField('message', tenChars);
  assert(result.valid === true,  `message="${tenChars}" (len=10) → valid should be true`);
  assert(result.error === '',    `message="${tenChars}" (len=10) → error should be empty string`);
});

describe('Message validation — valid inputs property test (all should return valid=true, empty error)', () => {
  for (const msg of validMessageGenerator(20)) {
    const result = validateField('message', msg);
    assert(
      result.valid === true,
      `message of length ${msg.length} → valid should be true`
    );
    assert(
      result.error === '',
      `message of length ${msg.length} → error should be empty string`
    );
  }
});

// ── COMBINED FORM STATES (property: any invalid field must cause valid=false) ──
describe('Combined form states — mixed valid/invalid inputs', () => {
  // Valid state: all fields valid
  assert(validateField('name',    'Alice').valid === true,          'valid name "Alice" passes');
  assert(validateField('email',   'alice@example.com').valid === true, 'valid email passes');
  assert(validateField('message', 'Hello there!').valid === true,   'valid message passes');

  // One field invalid at a time
  assert(validateField('name',    '').valid === false,              'empty name fails');
  assert(validateField('email',   'notvalid').valid === false,      'invalid email fails');
  assert(validateField('message', 'Hi').valid === false,            'too-short message fails');

  // Boundary: name exactly 1 char (invalid), exactly 2 chars (valid)
  assert(validateField('name', 'x').valid === false,  'name length 1 fails');
  assert(validateField('name', 'xy').valid === true,  'name length 2 passes');

  // Boundary: message exactly 9 chars (invalid), exactly 10 chars (valid)
  assert(validateField('message', 'abcdefghi').valid === false,   'message length 9 fails');
  assert(validateField('message', 'abcdefghij').valid === true,   'message length 10 passes');
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
