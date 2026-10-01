# Implementation Plan: Neobrutalism Portfolio Website

## Overview

This implementation plan converts the neobrutalism portfolio design into executable coding tasks. The website will be built using vanilla HTML, CSS, and JavaScript to create a visually striking single-page portfolio for Daniel Oscar Kantong. The implementation follows a layered approach: structure (HTML) → styling (CSS) → behavior (JavaScript), with incremental testing at each stage.

## Tasks

- [x] 1. Set up project structure and HTML foundation
  - Create `index.html` with complete semantic structure
  - Add all five content sections (profile, skills, experience, education, contact) with proper semantic HTML5 elements
  - Include meta tags, viewport configuration, and language attribute (`lang="id"`)
  - Link CSS and JavaScript files
  - Add ARIA labels and accessibility attributes to form elements
  - _Requirements: 1.2, 1.3, 2.1, 2.2, 3.1, 4.1, 5.1, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 2. Implement CSS design system and base styles
  - [x] 2.1 Create `styles.css` with CSS custom properties for neobrutalism design tokens
    - Define color palette (primary yellow, secondary pink, accent cyan, tertiary purple, neutrals)
    - Set up border styles (4px solid black), shadows (8px 8px brutal shadow)
    - Configure spacing scale (xs: 8px, sm: 16px, md: 32px, lg: 64px, xl: 96px)
    - Define typography variables (font families, weights, sizes with clamp())
    - _Requirements: 1.1, 1.5_
  
  - [x] 2.2 Implement base typography and layout system
    - Style body, headings (h1, h2, h3) with bold weights and proper hierarchy
    - Create container class with max-width 1200px
    - Style section elements with proper padding and bottom borders
    - Implement card component with thick borders and brutal shadows
    - _Requirements: 1.1, 1.4, 1.5, 2.3, 2.4_

- [x] 3. Style Profile Section
  - Apply neobrutalism styling to profile name (large bold typography)
  - Style profile title and introduction text
  - Add high-contrast background color and thick borders
  - Ensure proper spacing and visual hierarchy
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Style Skills Section
  - [x] 4.1 Implement skills grid layout
    - Create responsive grid using CSS Grid or Flexbox
    - Style individual skill items as bordered cards
    - Apply vibrant contrasting colors to each skill item
    - Ensure consistent sizing and spacing
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_
  
  - [-] 4.2 Test skills section responsiveness
    - Verify grid adapts to mobile (1 column), tablet (2 columns), desktop (4 columns)
    - Check visual consistency across breakpoints
    - _Requirements: 8.3_

- [x] 5. Style Experience Section
  - Stack experience items vertically using Flexbox
  - Create bordered cards for each company with thick borders
  - Apply alternating background colors for visual separation
  - Style company names, job titles, periods, and descriptions with proper hierarchy
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6. Style Education Section
  - Create bordered container with neobrutalism styling
  - Style degree title as primary heading
  - Format institution name and graduation year with clear hierarchy
  - Maintain consistent color scheme with other sections
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 7. Style Contact Form
  - [x] 7.1 Implement form layout and input styling
    - Style form groups with proper spacing
    - Apply neobrutalism borders to input fields and textarea
    - Style labels with bold typography
    - Create submit button with brutal shadow and hover effects
    - Add error message styling (red color, high contrast)
    - Style success/error feedback area
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 7.2 Add form state styles
    - Define `.invalid` class for error state (red border)
    - Define `.valid` class for success state (optional visual feedback)
    - Style `.error-message` with visibility toggle
    - Style `.form-feedback` with success and error variants
    - _Requirements: 6.6, 6.7_

- [ ] 8. Implement responsive design
  - [-] 8.1 Create mobile styles (< 768px)
    - Reduce section padding for smaller screens
    - Ensure single-column layout for all content
    - Adjust font sizes using clamp() for readability
    - Stack form elements vertically with full width
    - _Requirements: 8.3_
  
  - [x] 8.2 Create tablet and desktop media queries
    - Add tablet breakpoint (768px+) with increased padding and 2-column skills grid
    - Add desktop breakpoint (1024px+) with 4-column skills grid and larger typography
    - Ensure no horizontal scrolling at any viewport width
    - _Requirements: 8.3, 8.1, 8.4_

- [~] 9. Checkpoint - Visual design complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement JavaScript form validation
  - [x] 10.1 Create form validation module structure
    - Create `script.js` with ContactForm module
    - Set up initialization function to cache DOM references
    - Add submit event listener to contact form
    - _Requirements: 6.6_
  
  - [x] 10.2 Implement field validation functions
    - Write `validateField()` function with validation rules for name, email, message
    - Name validation: required, minimum 2 characters, no whitespace-only
    - Email validation: required, valid format using regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
    - Message validation: required, minimum 10 characters
    - Return validation result object with `valid` boolean and `error` string
    - _Requirements: 6.6_
  
  - [x] 10.3 Write property test for form validation correctness
    - **Property 1: Form Validation Correctness**
    - **Validates: Requirements 6.6**
    - Generate random form states (empty fields, invalid emails, valid data, boundary cases)
    - Verify validation returns false for invalid inputs with appropriate error messages
    - Verify validation returns true for all valid inputs with no error messages
  
  - [x] 10.4 Implement validation orchestration
    - Write `validateForm()` function to validate all fields
    - Iterate through all form fields and call `validateField()` for each
    - Collect validation errors in errors object
    - Return overall validation result with `isValid` boolean and `errors` object
    - _Requirements: 6.6_

- [x] 11. Implement error display and user feedback
  - [x] 11.1 Create error display functions
    - Write `showError()` function to display inline error messages
    - Write `clearError()` function to remove error messages
    - Update field classes to add/remove `.invalid` state
    - Update error element text content and visibility
    - _Requirements: 6.6_
  
  - [x] 11.2 Create success feedback function
    - Write `showFeedback()` function to show success/error messages
    - Display message in feedback area with appropriate styling class
    - Auto-hide feedback after 5 seconds using setTimeout
    - Use `role="alert"` and `aria-live="polite"` for accessibility
    - _Requirements: 6.7_
  
  - [x] 11.3 Write property test for success feedback display
    - **Property 2: Success Feedback Display**
    - **Validates: Requirements 6.7**
    - Generate random valid form data (various name lengths, email formats, message lengths)
    - Verify success message appears with positive styling
    - Verify form fields are cleared after submission
    - Verify feedback persists for 5 seconds

- [x] 12. Implement form submission handler
  - Write `handleSubmit()` function to prevent default form submission
  - Call `validateForm()` to check all fields
  - If validation fails, show error feedback message
  - If validation succeeds, show success message and reset form
  - _Requirements: 6.5, 6.6, 6.7_

- [x] 13. Initialize JavaScript on page load
  - Add DOMContentLoaded event listener
  - Call `ContactForm.init()` to set up form validation
  - Test form functionality in browser console
  - _Requirements: 6.6, 6.7_

- [~] 14. Checkpoint - Form validation complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Final integration and testing
  - [x] 15.1 Add content to all sections
    - Fill in Profile Section with Daniel's name and introduction
    - Add four skills to Skills Section (HTML, CSS, JavaScript, React)
    - Complete Experience Section with PT Kode Evolusi Bangsa and ForeverVacation Bali details
    - Add Education Section with Bachelor's degree information (Sarjana Ilmu Komputer)
    - _Requirements: 2.1, 3.2, 3.3, 3.4, 3.5, 4.2, 4.3, 5.2_
  
  - [-] 15.2 Write property test for responsive layout adaptation
    - **Property 3: Responsive Layout Adaptation**
    - **Validates: Requirements 8.3**
    - Test across random viewport widths (mobile 320-767px, tablet 768-1023px, desktop 1024-1920px, ultra-wide >1920px)
    - Verify no horizontal overflow at any width
    - Verify font sizes scale appropriately
    - Verify skills grid adapts: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
  
  - [-] 15.3 Perform cross-browser testing
    - Test in Chrome, Firefox, Safari, and Edge
    - Verify visual consistency and functionality
    - Check form validation in all browsers
    - _Requirements: 8.1, 8.4_
  
  - [ ] 15.4 Conduct accessibility audit
    - Test keyboard navigation through entire page
    - Verify all form inputs are keyboard accessible
    - Check ARIA labels and semantic HTML structure
    - Test with screen reader (NVDA/JAWS) if available
    - Verify color contrast meets WCAG AA standards
    - _Requirements: 6.2, 6.3, 6.4_

- [~] 16. Final checkpoint - Complete website validation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements from requirements.md for traceability
- The implementation follows a layered approach: HTML structure → CSS styling → JavaScript behavior
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Unit/integration tests ensure specific functionality works correctly
- The website uses only vanilla HTML, CSS, and JavaScript with zero external dependencies
- All styling follows neobrutalism principles: bold colors, thick borders (4px), brutal shadows (8px 8px), high contrast

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "3", "4.1", "5", "6", "7.1"] },
    { "id": 3, "tasks": ["4.2", "7.2", "8.1"] },
    { "id": 4, "tasks": ["8.2", "10.1"] },
    { "id": 5, "tasks": ["10.2"] },
    { "id": 6, "tasks": ["10.3", "10.4", "11.1"] },
    { "id": 7, "tasks": ["11.2"] },
    { "id": 8, "tasks": ["11.3", "12"] },
    { "id": 9, "tasks": ["13"] },
    { "id": 10, "tasks": ["15.1"] },
    { "id": 11, "tasks": ["15.2", "15.3", "15.4"] }
  ]
}
```
