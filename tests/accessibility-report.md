# Accessibility Audit Report — Neobrutalism Portfolio

**Date:** 2025  
**Standard:** WCAG 2.1 Level AA  
**Scope:** Static analysis of `index.html` and `styles.css`  
**Task:** 15.4 Conduct accessibility audit  
**Requirements covered:** 6.2, 6.3, 6.4

---

## Summary

The audit identified **4 issues** (2 failures, 2 improvements). All have been fixed. The website now meets WCAG 2.1 AA standards for the items that can be verified statically.

| # | Category | Severity | Status |
|---|----------|----------|--------|
| 1 | Color Contrast — white on pink (#FF006E) | **Fail** AA | ✅ Fixed |
| 2 | Missing `aria-describedby` on form inputs | **Fail** — screen reader gap | ✅ Fixed |
| 3 | Missing explicit outline on input `:focus` | Improvement | ✅ Fixed |
| 4 | Missing `:focus` fallback on submit button | Improvement | ✅ Fixed |

---

## Detailed Findings

### ✅ Passed — No Issues

#### Semantic HTML Structure
- `<main class="portfolio">` wraps all page content.
- All content regions use `<section>` with unique IDs (`#profile`, `#skills`, `#experience`, `#education`, `#contact`).
- Experience entries use `<article>` elements correctly.
- Heading hierarchy is logical: one `<h1>` (profile name) → `<h2>` per section title → `<h3>` per experience/education item.

#### Language Attribute
- `<html lang="id">` is present and correct for Indonesian content.

#### Viewport Meta
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.

#### Form Label Association
- All three inputs (`name`, `email`, `message`) have matching `<label for="…">` elements.
- `aria-required="true"` is set on all required fields.
- The form has `novalidate` to suppress native browser validation bubbles in favour of custom accessible messages.

#### Form Feedback ARIA
- `<div id="formFeedback" role="alert" aria-live="polite">` is present and correct.

#### Keyboard Navigation (structural)
- No `tabindex="-1"` applied to any interactive element — all inputs, textarea, and button remain in natural focus order.
- No `pointer-events: none` or `visibility: hidden` hides focusable elements.

#### Color Contrast — passing pairs
| Pair | Ratio | Result |
|------|-------|--------|
| Black (#000) on Yellow (#FFE700) | 16.68:1 | ✅ PASS AA |
| Black (#000) on Cyan (#00F5FF) | 15.50:1 | ✅ PASS AA |
| White (#FFF) on Purple (#8338EC) | 5.61:1 | ✅ PASS AA |
| Red (#CC0000) on White (#FFF) | 5.89:1 | ✅ PASS AA |
| Red (#CC0000) on #FFF5F5 (invalid bg) | 5.50:1 | ✅ PASS AA |
| #444444 on White | 9.74:1 | ✅ PASS AA |
| #444444 on Gray (#E5E5E5) | 7.73:1 | ✅ PASS AA |

---

### 🔴 Issue 1 — Color Contrast Failure: White text on Pink (#FF006E)

**WCAG Criterion:** 1.4.3 Contrast (Minimum), Level AA  
**Locations:**
- `.skill-item:nth-child(2)` — "CSS" skill card (white text on `#FF006E`)
- `.form-feedback.error` — error banner (white text on `#FF006E`)

**Measured contrast ratio:** 3.83:1 (required: 4.5:1 for normal text)

**Fix applied:**
- Changed `.skill-item:nth-child(2)` text color from `white` to `black` → new ratio **5.48:1** ✅
- Changed `.form-feedback.error` text color from `white` to `black` → new ratio **5.48:1** ✅

---

### 🔴 Issue 2 — Missing `aria-describedby` on Form Inputs

**WCAG Criterion:** 1.3.1 Info and Relationships, Level A; 4.1.3 Status Messages, Level AA  
**Locations:** All three form inputs (`#name`, `#email`, `#message`)

**Problem:** The inline error `<span>` elements have `role="alert"` which announces their text when content changes. However, without `aria-describedby` the association between an input and its error is not declared in the accessibility tree. Screen readers navigating to the input by Tab will not read the error message already displayed for that field.

**Fix applied:**
```html
<input id="name" aria-describedby="nameError" …>
<span id="nameError" role="alert"></span>

<input id="email" aria-describedby="emailError" …>
<span id="emailError" role="alert"></span>

<textarea id="message" aria-describedby="messageError" …></textarea>
<span id="messageError" role="alert"></span>
```

---

### 🟡 Issue 3 — Inputs/Textarea Lacked Explicit Focus Outline

**WCAG Criterion:** 2.4.7 Focus Visible, Level AA  
**Locations:** `.form-input:focus`, `.form-textarea:focus`

**Problem:** Focus styles relied solely on a `box-shadow` shift and a 1px `transform` offset. Some browsers reset `outline: none` by default and the shadow shift alone may not be perceivable in high-contrast mode or with certain OS accessibility settings.

**Fix applied:** Added explicit `outline: 3px solid #000; outline-offset: 2px` to the `:focus` rule, complementing the existing box-shadow.

---

### 🟡 Issue 4 — Submit Button Lacked `:focus` Fallback

**WCAG Criterion:** 2.4.7 Focus Visible, Level AA  
**Location:** `.submit-button`

**Problem:** Only `:focus-visible` was styled. Browsers that do not support `:focus-visible` (or fall back to it) would show no focus ring on keyboard navigation.

**Fix applied:**
```css
.submit-button:focus            { outline: 3px solid #FF006E; outline-offset: 3px; }
.submit-button:focus-visible    { outline: 3px solid #FF006E; outline-offset: 3px; }
/* Remove outline for mouse users in supporting browsers */
.submit-button:focus:not(:focus-visible) { outline: none; }
```

---

## Keyboard Navigation Assessment (structural)

| Element | Tab-reachable | Focus style present |
|---------|---------------|---------------------|
| Name input | ✅ Yes | ✅ Yes (after fix) |
| Email input | ✅ Yes | ✅ Yes (after fix) |
| Message textarea | ✅ Yes | ✅ Yes (after fix) |
| Submit button | ✅ Yes | ✅ Yes (after fix) |

Tab order follows DOM order (profile → skills → experience → education → contact form fields → submit button), which is logical and matches the visual reading flow.

---

## Screen Reader Notes

Full screen reader testing (NVDA/JAWS) requires a live browser environment and is outside the scope of this static audit. Based on structural analysis:

- `role="alert"` on error spans will announce errors as they are injected by JavaScript.
- `aria-live="polite"` on `#formFeedback` will announce the success/error banner without interrupting ongoing narration.
- `aria-describedby` now links each input to its error span so errors are read when navigating back to the field.
- Heading hierarchy (h1 → h2 → h3) provides a clear document outline for screen reader navigation.

**Recommendation:** Run NVDA + Chrome or JAWS + Edge on the live page and confirm:
1. Tab order reads: Name → Email → Message → Send Message button.
2. Submitting with empty fields announces error messages per field.
3. Successful submission announces the success banner.

---

## Remaining Manual Checks (cannot be verified statically)

| Check | Notes |
|-------|-------|
| Screen reader announcement of errors | Requires live browser + NVDA/JAWS |
| Focus order in browser rendering | Requires manual keyboard test |
| Reflow at 400% zoom (WCAG 1.4.10) | Requires browser test |
| Motion preferences (`prefers-reduced-motion`) | No animations currently present — N/A |
| Touch target size (WCAG 2.5.5) | Requires device/emulator test |
