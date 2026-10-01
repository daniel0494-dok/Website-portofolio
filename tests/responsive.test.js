/**
 * Property Test: Responsive Layout Adaptation
 * Validates: Requirements 8.3
 *
 * Property 3: For ANY viewport width, the website SHALL maintain proper layout
 * without horizontal scrolling, ensure all text remains readable, and adapt the
 * skills grid and other multi-column layouts to appropriate column counts.
 *
 * Since true browser viewport testing requires a headless browser, this test
 * validates the CSS source text and HTML source text to verify that all the
 * structural rules required for correct responsive behaviour are present.
 *
 * Sub-properties verified:
 *   3a – overflow-x: hidden on html/body (prevents horizontal scrolling)
 *   3b – .skills-list base style: grid-template-columns: 1fr  (1-col mobile)
 *   3c – @media (min-width: 768px) sets .skills-list to repeat(2, 1fr)
 *   3d – @media (min-width: 1024px) sets .skills-list to repeat(4, 1fr)
 *   3e – clamp() used for responsive font sizing (h1/h2/h3/body)
 *   3f – max-width: 100% on media elements (overflow prevention)
 *   3g – @media (max-width: 767px) block exists (mobile reduced padding)
 *   3h – <meta name="viewport"> with width=device-width, initial-scale=1.0
 *   3i – No inline style attributes with fixed pixel widths exceeding viewport
 *
 * This is a self-running Node.js test script.
 * Exit code 0 = all tests passed.  Exit code 1 = one or more failures.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Load source files
// ---------------------------------------------------------------------------
const ROOT     = path.resolve(__dirname, '..');
const CSS_PATH = path.join(ROOT, 'styles.css');
const HTML_PATH = path.join(ROOT, 'index.html');

let cssText  = '';
let htmlText = '';

try {
  cssText  = fs.readFileSync(CSS_PATH,  'utf8');
} catch (e) {
  console.error(`ERROR: Could not read styles.css at ${CSS_PATH}\n${e.message}`);
  process.exit(1);
}

try {
  htmlText = fs.readFileSync(HTML_PATH, 'utf8');
} catch (e) {
  console.error(`ERROR: Could not read index.html at ${HTML_PATH}\n${e.message}`);
  process.exit(1);
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
// CSS parsing helpers
// ---------------------------------------------------------------------------

/**
 * Extract the full text content of a @media block that matches the given
 * condition string (e.g. "(min-width: 768px)").
 * Returns the inner block text (between the outermost braces) or null.
 */
function extractMediaBlock(css, condition) {
  // Build a regex that finds "@media ... <condition> ... { ... }"
  // We escape parens and colons for the regex search.
  const escapedCondition = condition
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/:/g, ':')
    .replace(/\./g, '\\.');

  const startPattern = new RegExp(
    `@media[^{]*${escapedCondition}[^{]*\\{`,
    'i'
  );

  const match = startPattern.exec(css);
  if (!match) return null;

  // Walk forward through the CSS to find the matching closing brace,
  // tracking nesting depth so we handle nested rules correctly.
  let depth = 0;
  let start = -1;
  let end   = -1;

  for (let i = match.index; i < css.length; i++) {
    if (css[i] === '{') {
      if (depth === 0) start = i + 1;
      depth++;
    } else if (css[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (start === -1 || end === -1) return null;
  return css.slice(start, end);
}

/**
 * Strip CSS comments from a text to avoid false positives.
 */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

// Strip comments from CSS once so all checks work on clean text.
const cleanCss = stripComments(cssText);

// ---------------------------------------------------------------------------
// Property 3a – overflow-x: hidden on html/body
// ---------------------------------------------------------------------------
describe('Property 3a — overflow-x: hidden declared on html/body to prevent horizontal scrolling', () => {
  // Match any rule block that targets html, body, or "html, body" and
  // contains overflow-x: hidden.
  const overflowHiddenPattern = /overflow-x\s*:\s*hidden/i;
  // We need it in context of an html or body selector.
  // Strategy: find a block containing both a selector with html|body and the declaration.
  // Simpler: just confirm the declaration appears somewhere in the stylesheet –
  // the design requires it on html, body, or "html, body".
  const hasOverflowHidden = overflowHiddenPattern.test(cleanCss);
  assert(
    hasOverflowHidden,
    'styles.css contains "overflow-x: hidden" (required on html/body)'
  );

  // Stronger check: confirm it appears before/inside a rule targeting html or body
  const htmlBodyBlockPattern = /(?:html\s*,\s*body|html|body)\s*\{[^}]*overflow-x\s*:\s*hidden[^}]*\}/is;
  assert(
    htmlBodyBlockPattern.test(cleanCss),
    '"overflow-x: hidden" is declared inside an html or body rule block'
  );
});

// ---------------------------------------------------------------------------
// Property 3b – .skills-list base: grid-template-columns: 1fr (single column)
// ---------------------------------------------------------------------------
describe('Property 3b — .skills-list base (mobile-first) style uses single-column grid-template-columns: 1fr', () => {
  // The base rule must appear outside any media query.
  // We find the .skills-list block in the base styles (before the first @media).
  const firstMediaIndex = cleanCss.indexOf('@media');
  const baseStyles = firstMediaIndex !== -1
    ? cleanCss.slice(0, firstMediaIndex)
    : cleanCss;

  // Find the .skills-list block in base styles
  const skillsBasePattern = /\.skills-list\s*\{([^}]*)\}/is;
  const match = skillsBasePattern.exec(baseStyles);
  assert(
    match !== null,
    '.skills-list rule block exists in base styles (outside media queries)'
  );

  if (match) {
    const block = match[1];
    const singleColPattern = /grid-template-columns\s*:\s*1fr\s*;?/i;
    assert(
      singleColPattern.test(block),
      '.skills-list base style sets grid-template-columns: 1fr (single column for mobile)'
    );
  }
});

// ---------------------------------------------------------------------------
// Property 3c – @media (min-width: 768px) sets .skills-list to repeat(2, 1fr)
// ---------------------------------------------------------------------------
describe('Property 3c — @media (min-width: 768px) sets .skills-list to 2-column grid', () => {
  const tabletBlock = extractMediaBlock(cleanCss, '(min-width: 768px)');
  assert(
    tabletBlock !== null,
    '@media (min-width: 768px) block exists in styles.css'
  );

  if (tabletBlock) {
    const skillsIn768Pattern = /\.skills-list\s*\{[^}]*grid-template-columns\s*:\s*repeat\s*\(\s*2\s*,\s*1fr\s*\)[^}]*\}/is;
    assert(
      skillsIn768Pattern.test(tabletBlock),
      '@media (min-width: 768px) — .skills-list uses repeat(2, 1fr) (2-column tablet grid)'
    );
  }
});

// ---------------------------------------------------------------------------
// Property 3d – @media (min-width: 1024px) sets .skills-list to repeat(4, 1fr)
// ---------------------------------------------------------------------------
describe('Property 3d — @media (min-width: 1024px) sets .skills-list to 4-column grid', () => {
  const desktopBlock = extractMediaBlock(cleanCss, '(min-width: 1024px)');
  assert(
    desktopBlock !== null,
    '@media (min-width: 1024px) block exists in styles.css'
  );

  if (desktopBlock) {
    const skillsIn1024Pattern = /\.skills-list\s*\{[^}]*grid-template-columns\s*:\s*repeat\s*\(\s*4\s*,\s*1fr\s*\)[^}]*\}/is;
    assert(
      skillsIn1024Pattern.test(desktopBlock),
      '@media (min-width: 1024px) — .skills-list uses repeat(4, 1fr) (4-column desktop grid)'
    );
  }
});

// ---------------------------------------------------------------------------
// Property 3e – clamp() used for responsive font sizing
// ---------------------------------------------------------------------------
describe('Property 3e — clamp() is used for responsive font sizing on headings and body', () => {
  const clampPattern = /clamp\s*\(/i;
  assert(
    clampPattern.test(cleanCss),
    'styles.css uses clamp() for responsive font sizing'
  );

  // Verify clamp() appears on at least h1, h2, and h3 font-size rules
  const h1ClampPattern = /h1\s*\{[^}]*font-size\s*:\s*clamp\s*\(/is;
  assert(
    h1ClampPattern.test(cleanCss),
    'h1 font-size uses clamp() for fluid typography'
  );

  const h2ClampPattern = /h2\s*\{[^}]*font-size\s*:\s*clamp\s*\(/is;
  assert(
    h2ClampPattern.test(cleanCss),
    'h2 font-size uses clamp() for fluid typography'
  );

  const h3ClampPattern = /h3\s*\{[^}]*font-size\s*:\s*clamp\s*\(/is;
  assert(
    h3ClampPattern.test(cleanCss),
    'h3 font-size uses clamp() for fluid typography'
  );
});

// ---------------------------------------------------------------------------
// Property 3f – max-width: 100% on media elements
// ---------------------------------------------------------------------------
describe('Property 3f — max-width: 100% declared for overflow prevention on replaced/media elements', () => {
  // The rule can be on img, video, iframe, embed, object, or a grouping.
  const maxWidthPattern = /max-width\s*:\s*100%/i;
  assert(
    maxWidthPattern.test(cleanCss),
    'styles.css contains max-width: 100% (overflow prevention on media elements)'
  );

  // Stronger: confirm it appears in a rule that targets at least one media element
  const mediaElementPattern = /(?:img|video|iframe|embed|object)[^{]*\{[^}]*max-width\s*:\s*100%/is;
  assert(
    mediaElementPattern.test(cleanCss),
    'max-width: 100% is scoped to media/replaced elements (img, video, iframe, embed, or object)'
  );
});

// ---------------------------------------------------------------------------
// Property 3g – @media (max-width: 767px) block exists (mobile reduced padding)
// ---------------------------------------------------------------------------
describe('Property 3g — @media (max-width: 767px) block exists for mobile-specific reduced padding', () => {
  const mobileBlock = extractMediaBlock(cleanCss, '(max-width: 767px)');
  assert(
    mobileBlock !== null,
    '@media (max-width: 767px) block exists in styles.css (mobile styles)'
  );

  if (mobileBlock) {
    // Verify the block contains at least one padding reduction
    const paddingPattern = /padding\s*:/i;
    assert(
      paddingPattern.test(mobileBlock),
      '@media (max-width: 767px) block contains at least one padding rule (reducing padding on mobile)'
    );
  }
});

// ---------------------------------------------------------------------------
// Property 3h – <meta name="viewport"> with correct content in index.html
// ---------------------------------------------------------------------------
describe('Property 3h — index.html contains correct viewport <meta> tag', () => {
  const viewportTagPattern = /<meta\s[^>]*name\s*=\s*["']viewport["'][^>]*>/i;
  const viewportMatch = viewportTagPattern.exec(htmlText);
  assert(
    viewportMatch !== null,
    'index.html contains a <meta name="viewport"> tag'
  );

  if (viewportMatch) {
    const tagText = viewportMatch[0];
    // Check for width=device-width
    assert(
      /width\s*=\s*device-width/i.test(tagText),
      '<meta viewport> contains width=device-width'
    );
    // Check for initial-scale=1 (or initial-scale=1.0)
    assert(
      /initial-scale\s*=\s*1(?:\.0)?(?=[,\s"'])/i.test(tagText),
      '<meta viewport> contains initial-scale=1.0'
    );
  }
});

// ---------------------------------------------------------------------------
// Property 3i – No inline style attributes with fixed pixel widths > 100vw
// ---------------------------------------------------------------------------
describe('Property 3i — No inline style attributes set fixed pixel widths that would exceed the viewport', () => {
  // Find all style="..." attribute values in the HTML
  const inlineStylePattern = /style\s*=\s*["']([^"']+)["']/gi;
  let match;
  const oversizedWidths = [];

  while ((match = inlineStylePattern.exec(htmlText)) !== null) {
    const styleValue = match[1];
    // Look for width: <number>px where number > 100 (conservative: anything
    // with a fixed px width could exceed a small viewport, but we focus on
    // values obviously larger than any realistic viewport — 1921px+ — or
    // widths that are clearly non-responsive such as widths > 100vw equivalent.
    // For safety we flag anything with width set to a fixed px value > 640px
    // (the width at which a fixed element would overflow on most mobile devices).
    const widthPxPattern = /\bwidth\s*:\s*(\d+(?:\.\d+)?)\s*px/i;
    const widthMatch = widthPxPattern.exec(styleValue);
    if (widthMatch) {
      const widthValue = parseFloat(widthMatch[1]);
      if (widthValue > 640) {
        oversizedWidths.push({ styleValue, width: widthValue });
      }
    }
  }

  assert(
    oversizedWidths.length === 0,
    oversizedWidths.length === 0
      ? 'No inline style attributes contain fixed pixel widths > 640px that could overflow on mobile'
      : `Found ${oversizedWidths.length} inline style(s) with potentially overflowing widths: ` +
        oversizedWidths.map(o => `"${o.styleValue}" (${o.width}px)`).join(', ')
  );
});

// ---------------------------------------------------------------------------
// Additional property-based tests: breakpoint column counts across random widths
// ---------------------------------------------------------------------------
describe('Property 3 (combined) — Column count rules are monotonically consistent across breakpoints', () => {
  // The column counts must satisfy: mobile(1) < tablet(2) < desktop(4).
  // We verify that the numeric column values in the CSS rules are correct
  // and form a strictly increasing sequence.

  // Extract the column counts from each media block
  function extractSkillsColumnCount(block) {
    if (!block) return null;
    const m = /\.skills-list\s*\{[^}]*grid-template-columns\s*:\s*(?:repeat\s*\(\s*(\d+)|(\d+)fr)[^}]*\}/is.exec(block);
    if (!m) return null;
    // Group 1 = repeat(N, ...), group 2 = Nfr directly
    return parseInt(m[1] || m[2], 10);
  }

  // Base: 1fr  means 1 column
  const firstMediaIndex = cleanCss.indexOf('@media');
  const baseStyles = firstMediaIndex !== -1 ? cleanCss.slice(0, firstMediaIndex) : cleanCss;
  const baseMatch = /\.skills-list\s*\{[^}]*grid-template-columns\s*:\s*1fr\s*;?[^}]*\}/is.exec(baseStyles);
  const baseCols = baseMatch ? 1 : null;

  const tabletBlock  = extractMediaBlock(cleanCss, '(min-width: 768px)');
  const desktopBlock = extractMediaBlock(cleanCss, '(min-width: 1024px)');

  const tabletCols  = extractSkillsColumnCount(tabletBlock);
  const desktopCols = extractSkillsColumnCount(desktopBlock);

  assert(
    baseCols === 1,
    `Mobile base column count should be 1 (got ${baseCols})`
  );
  assert(
    tabletCols === 2,
    `Tablet (768px+) column count should be 2 (got ${tabletCols})`
  );
  assert(
    desktopCols === 4,
    `Desktop (1024px+) column count should be 4 (got ${desktopCols})`
  );

  // Verify monotonic increase: mobile < tablet < desktop
  if (baseCols !== null && tabletCols !== null && desktopCols !== null) {
    assert(
      baseCols < tabletCols && tabletCols < desktopCols,
      `Column counts are strictly increasing: mobile(${baseCols}) < tablet(${tabletCols}) < desktop(${desktopCols})`
    );
  }

  // Property test: simulate 30 random viewport widths and verify the
  // expected column count rule would apply for each range.
  function expectedColumnsForWidth(width) {
    if (width >= 1024) return 4;
    if (width >= 768)  return 2;
    return 1;
  }

  // Verify each range produces a sensible count
  const testWidths = [];
  // Mobile range: 320–767
  for (let i = 0; i < 10; i++) {
    testWidths.push(320 + Math.floor(Math.random() * (768 - 320)));
  }
  // Tablet range: 768–1023
  for (let i = 0; i < 10; i++) {
    testWidths.push(768 + Math.floor(Math.random() * (1024 - 768)));
  }
  // Desktop range: 1024–1920
  for (let i = 0; i < 10; i++) {
    testWidths.push(1024 + Math.floor(Math.random() * (1920 - 1024)));
  }

  // Mapping from expected counts to the CSS column values we found
  const cssColumnCounts = {
    1: baseCols,
    2: tabletCols,
    4: desktopCols,
  };

  let allWidthsCorrect = true;
  const failedWidths = [];

  for (const width of testWidths) {
    const expected = expectedColumnsForWidth(width);
    const actual   = cssColumnCounts[expected];
    if (actual !== expected) {
      allWidthsCorrect = false;
      failedWidths.push(`${width}px → expected ${expected} col(s), CSS has ${actual}`);
    }
  }

  assert(
    allWidthsCorrect,
    allWidthsCorrect
      ? `All ${testWidths.length} sampled viewport widths map to a valid column count in CSS`
      : `Column count mismatch for widths: ${failedWidths.join('; ')}`
  );
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
