# Design Document: Neobrutalism Portfolio Website

## Overview

This document outlines the technical design for Daniel Oscar Kantong's personal portfolio website. The site employs a neobrutalism aesthetic—characterized by bold colors, thick borders, and high contrast—to create a visually striking single-page experience. Built with vanilla HTML, CSS, and JavaScript (no frameworks), the portfolio presents Daniel's professional profile, technical skills, work experience, educational background, and a contact form for potential employers.

## Architecture

### High-Level Structure

The application follows a **static single-page architecture** with three core layers:

```
┌─────────────────────────────────────┐
│      Presentation Layer (HTML)      │
│  - Semantic structure               │
│  - Content sections                 │
│  - Form elements                    │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│      Styling Layer (CSS)            │
│  - Neobrutalism visual design       │
│  - Responsive layout                │
│  - Animation & transitions          │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│      Behavior Layer (JavaScript)    │
│  - Form validation                  │
│  - User feedback                    │
│  - Smooth scrolling (optional)      │
└─────────────────────────────────────┘
```

### Technology Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Styling with flexbox/grid for layout, custom properties for theming
- **Vanilla JavaScript (ES6+)**: Form validation and interactivity
- **No external dependencies**: Zero framework/library requirements

## Component Design

### 1. HTML Structure Component

**Purpose**: Provide semantic, accessible document structure

**Structure**:
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daniel Oscar Kantong - Portfolio</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main class="portfolio">
    <section id="profile" class="section profile-section">
      <!-- Profile content -->
    </section>
    
    <section id="skills" class="section skills-section">
      <!-- Skills content -->
    </section>
    
    <section id="experience" class="section experience-section">
      <!-- Experience content -->
    </section>
    
    <section id="education" class="section education-section">
      <!-- Education content -->
    </section>
    
    <section id="contact" class="section contact-section">
      <!-- Contact form -->
    </section>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

**Key Decisions**:
- Use `<section>` elements with unique IDs for each content area
- Apply semantic HTML5 elements (`<main>`, `<section>`, `<form>`, etc.)
- Include `lang="id"` for Indonesian language content
- Place CSS in `<head>` and JavaScript before closing `</body>` for optimal loading

### 2. Profile Section

**Content**:
- Full name: "Daniel Oscar Kantong"
- Professional title/tagline
- Brief introduction paragraph

**HTML Structure**:
```html
<section id="profile" class="section profile-section">
  <div class="container">
    <h1 class="profile-name">Daniel Oscar Kantong</h1>
    <p class="profile-title">Web Developer</p>
    <p class="profile-intro">
      [Professional introduction text showcasing expertise and passion]
    </p>
  </div>
</section>
```

**Styling Approach**:
- Large, bold typography for name (neobrutalism emphasis)
- Thick border around section or name element
- High-contrast color scheme (e.g., black text on bright yellow/pink background)
- Generous spacing for visual impact

### 3. Skills Section

**Content**: Display four core skills (HTML, CSS, JavaScript, React)

**HTML Structure**:
```html
<section id="skills" class="section skills-section">
  <div class="container">
    <h2 class="section-title">Skills</h2>
    <ul class="skills-list">
      <li class="skill-item">HTML</li>
      <li class="skill-item">CSS</li>
      <li class="skill-item">JavaScript</li>
      <li class="skill-item">React</li>
    </ul>
  </div>
</section>
```

**Styling Approach**:
- Display skills as grid or flex items (responsive)
- Each skill in a bold, bordered "card" or "tag"
- Vibrant, contrasting colors for each skill item
- Consistent sizing and spacing

### 4. Experience Section

**Content**: Work history at two companies

**HTML Structure**:
```html
<section id="experience" class="section experience-section">
  <div class="container">
    <h2 class="section-title">Experience</h2>
    <div class="experience-list">
      <article class="experience-item">
        <h3 class="company-name">PT Kode Evolusi Bangsa</h3>
        <p class="job-title">[Job Title]</p>
        <p class="job-period">[Employment Period]</p>
        <p class="job-description">[Brief description of role and responsibilities]</p>
      </article>
      
      <article class="experience-item">
        <h3 class="company-name">ForeverVacation Bali</h3>
        <p class="job-title">[Job Title]</p>
        <p class="job-period">[Employment Period]</p>
        <p class="job-description">[Brief description of role and responsibilities]</p>
      </article>
    </div>
  </div>
</section>
```

**Styling Approach**:
- Stack experience items vertically
- Thick borders around each experience card
- Alternating background colors for visual separation
- Bold headings for company names

### 5. Education Section

**Content**: Bachelor's degree in Computer Science

**HTML Structure**:
```html
<section id="education" class="section education-section">
  <div class="container">
    <h2 class="section-title">Education</h2>
    <div class="education-item">
      <h3 class="degree-title">Sarjana Ilmu Komputer (S.Kom)</h3>
      <p class="institution-name">[University Name]</p>
      <p class="graduation-year">[Graduation Year]</p>
    </div>
  </div>
</section>
```

**Styling Approach**:
- Clear hierarchy with degree as primary heading
- Bordered container with neobrutalism styling
- Consistent color scheme with other sections

### 6. Contact Form Component

**Purpose**: Enable employers to send messages to Daniel

**HTML Structure**:
```html
<section id="contact" class="section contact-section">
  <div class="container">
    <h2 class="section-title">Contact</h2>
    <form id="contactForm" class="contact-form" novalidate>
      <div class="form-group">
        <label for="name" class="form-label">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          class="form-input" 
          required
          aria-required="true"
        >
        <span class="error-message" id="nameError"></span>
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          class="form-input" 
          required
          aria-required="true"
        >
        <span class="error-message" id="emailError"></span>
      </div>
      
      <div class="form-group">
        <label for="message" class="form-label">Message</label>
        <textarea 
          id="message" 
          name="message" 
          class="form-textarea" 
          rows="5" 
          required
          aria-required="true"
        ></textarea>
        <span class="error-message" id="messageError"></span>
      </div>
      
      <button type="submit" class="submit-button">Send Message</button>
    </form>
    
    <div id="formFeedback" class="form-feedback" role="alert" aria-live="polite"></div>
  </div>
</section>
```

**Validation Logic (JavaScript)**:

```javascript
// Form validation module
const ContactForm = {
  form: null,
  fields: {},
  
  init() {
    this.form = document.getElementById('contactForm');
    this.fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message')
    };
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },
  
  validateField(field, value) {
    // Returns { valid: boolean, error: string }
    if (field === 'name') {
      if (!value.trim()) {
        return { valid: false, error: 'Name is required' };
      }
      if (value.trim().length < 2) {
        return { valid: false, error: 'Name must be at least 2 characters' };
      }
      return { valid: true, error: '' };
    }
    
    if (field === 'email') {
      if (!value.trim()) {
        return { valid: false, error: 'Email is required' };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, error: 'Please enter a valid email address' };
      }
      return { valid: true, error: '' };
    }
    
    if (field === 'message') {
      if (!value.trim()) {
        return { valid: false, error: 'Message is required' };
      }
      if (value.trim().length < 10) {
        return { valid: false, error: 'Message must be at least 10 characters' };
      }
      return { valid: true, error: '' };
    }
    
    return { valid: true, error: '' };
  },
  
  validateForm() {
    let isValid = true;
    const errors = {};
    
    for (const [fieldName, fieldElement] of Object.entries(this.fields)) {
      const validation = this.validateField(fieldName, fieldElement.value);
      if (!validation.valid) {
        isValid = false;
        errors[fieldName] = validation.error;
        this.showError(fieldName, validation.error);
      } else {
        this.clearError(fieldName);
      }
    }
    
    return { isValid, errors };
  },
  
  showError(fieldName, message) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
    this.fields[fieldName].classList.add('invalid');
  },
  
  clearError(fieldName) {
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
    this.fields[fieldName].classList.remove('invalid');
  },
  
  showFeedback(message, isSuccess) {
    const feedback = document.getElementById('formFeedback');
    feedback.textContent = message;
    feedback.className = `form-feedback ${isSuccess ? 'success' : 'error'}`;
    feedback.classList.add('visible');
    
    // Hide feedback after 5 seconds
    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 5000);
  },
  
  handleSubmit(e) {
    e.preventDefault();
    
    const validation = this.validateForm();
    
    if (validation.isValid) {
      // In a real implementation, this would send data to a server
      // For now, just show success message
      this.showFeedback('Thank you for your message! I will get back to you soon.', true);
      this.form.reset();
    } else {
      this.showFeedback('Please fix the errors above and try again.', false);
    }
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  ContactForm.init();
});
```

**Form Validation Rules**:
- **Name**: Required, minimum 2 characters
- **Email**: Required, valid email format (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Message**: Required, minimum 10 characters

**User Feedback**:
- **Inline errors**: Display error messages below each invalid field
- **Success message**: Show confirmation message after successful submission
- **Visual indicators**: Add CSS classes (`.invalid`, `.valid`) to fields for styling

## CSS Design System

### Neobrutalism Style Guide

**Color Palette**:
```css
:root {
  /* Primary colors - bold and vibrant */
  --color-primary: #FFE700;      /* Bright yellow */
  --color-secondary: #FF006E;    /* Hot pink */
  --color-accent: #00F5FF;       /* Cyan */
  --color-tertiary: #8338EC;     /* Purple */
  
  /* Neutral colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray: #E5E5E5;
  
  /* Borders */
  --border-width: 4px;
  --border-style: solid;
  --border-color: var(--color-black);
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 32px;
  --spacing-lg: 64px;
  --spacing-xl: 96px;
  
  /* Typography */
  --font-family: 'Arial', 'Helvetica', sans-serif;
  --font-weight-bold: 900;
  --font-weight-normal: 400;
  
  /* Shadows */
  --shadow-brutal: 8px 8px 0 var(--color-black);
}
```

**Typography**:
```css
body {
  font-family: var(--font-family);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
  color: var(--color-black);
}

h1, h2, h3 {
  font-weight: var(--font-weight-bold);
  line-height: 1.2;
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
```

**Layout System**:
```css
.section {
  padding: var(--spacing-lg) var(--spacing-md);
  border-bottom: var(--border-width) var(--border-style) var(--border-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Neobrutalism card style */
.card {
  background: var(--color-white);
  border: var(--border-width) var(--border-style) var(--border-color);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-brutal);
}
```

**Responsive Breakpoints**:
```css
/* Mobile-first approach */
/* Base styles: mobile (< 768px) */

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Responsive Design Strategy

**Mobile (< 768px)**:
- Single column layout
- Stacked sections
- Full-width elements
- Reduced padding
- Font size adjustments via `clamp()`

**Tablet (768px - 1023px)**:
- Increased padding
- Skills grid: 2 columns
- Form width: 80-90% of container

**Desktop (≥ 1024px)**:
- Maximum content width: 1200px
- Skills grid: 4 columns
- Larger typography
- Increased shadows for depth

## Data Models

### Form Data Model

```javascript
interface ContactFormData {
  name: string;        // Employer's name (2-100 characters)
  email: string;       // Valid email address
  message: string;     // Message content (10-5000 characters)
  timestamp: Date;     // Submission timestamp (optional for future use)
}
```

### Validation Result Model

```javascript
interface ValidationResult {
  valid: boolean;      // Overall validation status
  error: string;       // Error message if invalid
}

interface FormValidationResult {
  isValid: boolean;               // Overall form validity
  errors: {                       // Field-specific errors
    [fieldName: string]: string;
  };
}
```

## Error Handling

### Form Validation Errors

**Client-Side Validation**:
1. **Empty field errors**: Display when required fields are empty
2. **Format errors**: Show when email doesn't match expected pattern
3. **Length errors**: Indicate when input is too short/long

**Error Display Strategy**:
- Show errors inline below each field
- Use red color for error text (maintaining high contrast)
- Add visual indicator (border color change) to invalid fields
- Provide clear, actionable error messages

**Example Error Messages**:
```javascript
const ERROR_MESSAGES = {
  name: {
    required: 'Name is required',
    minLength: 'Name must be at least 2 characters'
  },
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address'
  },
  message: {
    required: 'Message is required',
    minLength: 'Message must be at least 10 characters'
  }
};
```

### Browser Compatibility Fallbacks

**CSS Fallbacks**:
```css
/* Provide fallbacks for modern CSS features */
.grid-container {
  display: flex;              /* Fallback */
  flex-wrap: wrap;           /* Fallback */
  display: grid;             /* Modern browsers */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

**JavaScript Feature Detection**:
```javascript
// Check for required features
if (!window.FormData || !document.querySelector) {
  console.error('Browser not supported');
  // Display fallback message to user
}
```

## Performance Considerations

### Optimization Strategies

1. **CSS Optimization**:
   - Use CSS custom properties for maintainable theming
   - Minimize repaints with transform/opacity for animations
   - Avoid expensive CSS selectors

2. **JavaScript Optimization**:
   - Debounce input validation if real-time validation is added
   - Use event delegation where appropriate
   - Minimize DOM queries (cache references)

3. **Asset Optimization**:
   - Use system fonts (no web font loading)
   - Inline critical CSS if needed for faster first paint
   - Minimize HTTP requests (single HTML, CSS, JS file)

4. **Responsive Images** (if added later):
   - Use `srcset` for different screen sizes
   - Lazy load images below the fold

### Loading Strategy

```html
<!-- CSS in head for rendering -->
<head>
  <link rel="stylesheet" href="styles.css">
</head>

<!-- JavaScript at end of body (non-blocking) -->
<body>
  <!-- content -->
  <script src="script.js"></script>
</body>
```

## Accessibility Considerations

### ARIA Labels and Semantic HTML

1. **Form Accessibility**:
   - Associate labels with inputs using `for` attribute
   - Use `aria-required="true"` for required fields
   - Use `aria-live="polite"` for feedback messages
   - Ensure error messages have `role="alert"`

2. **Keyboard Navigation**:
   - Ensure all interactive elements are keyboard accessible
   - Maintain logical tab order
   - Provide visible focus indicators

3. **Screen Reader Support**:
   - Use semantic HTML elements (`<main>`, `<section>`, `<article>`)
   - Provide meaningful heading hierarchy (h1 → h2 → h3)
   - Include alt text for any images (if added)

4. **Color Contrast**:
   - Maintain WCAG AA contrast ratio (4.5:1 for normal text)
   - Don't rely solely on color to convey information
   - Ensure error states are distinguishable beyond color

## Testing Strategy

### Manual Testing Checklist

**Visual Design**:
- ✓ Verify neobrutalism aesthetic (bold colors, thick borders)
- ✓ Check visual consistency across sections
- ✓ Confirm high contrast and readability

**Content Verification**:
- ✓ Profile section displays name and introduction
- ✓ Skills section shows HTML, CSS, JavaScript, React
- ✓ Experience section includes both companies
- ✓ Education section shows Bachelor's degree
- ✓ Contact form has all required fields

**Responsive Testing**:
- ✓ Test on mobile viewport (375px)
- ✓ Test on tablet viewport (768px)
- ✓ Test on desktop viewport (1280px)
- ✓ Verify no horizontal scrolling
- ✓ Check text readability at all sizes

**Form Functionality**:
- ✓ Test validation with empty fields
- ✓ Test validation with invalid email
- ✓ Test validation with short name/message
- ✓ Test successful submission
- ✓ Verify error messages display correctly
- ✓ Verify success message displays after valid submission

**Browser Compatibility**:
- ✓ Test in Chrome
- ✓ Test in Firefox
- ✓ Test in Safari
- ✓ Test in Edge

**Accessibility**:
- ✓ Navigate entire page using keyboard only
- ✓ Test with screen reader (NVDA/JAWS)
- ✓ Verify color contrast with tools
- ✓ Check heading hierarchy

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Form Validation Correctness

*For any* combination of form field values (name, email, message), the validation function SHALL return `false` and display appropriate error messages when any required field is empty or invalid, and SHALL return `true` with no error messages when all fields contain valid data.

**Validates: Requirements 6.6**

**Testing Approach**: Generate random form states including:
- All fields empty
- Individual fields empty while others are filled
- Invalid email formats (missing @, missing domain, etc.)
- Valid data in all fields
- Boundary cases (minimum length values, whitespace-only strings)

**Expected Behavior**:
- Empty or whitespace-only name → validation fails
- Invalid email format → validation fails
- Empty or too-short message → validation fails
- All valid inputs → validation succeeds

---

### Property 2: Success Feedback Display

*For any* valid form submission (where all fields pass validation), the system SHALL display a success confirmation message to the user and clear all form fields.

**Validates: Requirements 6.7**

**Testing Approach**: Generate random valid form data with:
- Various name lengths (within valid range)
- Different valid email formats
- Messages of varying lengths (above minimum)

**Expected Behavior**:
- Success message appears in the feedback area
- Message has positive styling (success class)
- Form fields are cleared after submission
- Feedback persists for defined duration (5 seconds)

---

### Property 3: Responsive Layout Adaptation

*For any* viewport width, the website SHALL maintain proper layout without horizontal scrolling, ensure all text remains readable (not too small), and adapt the skills grid and other multi-column layouts to appropriate column counts for that screen size.

**Validates: Requirements 8.3**

**Testing Approach**: Test across random viewport widths including:
- Mobile range (320px - 767px)
- Tablet range (768px - 1023px)
- Desktop range (1024px - 1920px)
- Ultra-wide (> 1920px)

**Expected Behavior**:
- No elements cause horizontal overflow at any width
- Font sizes scale appropriately (via `clamp()` or media queries)
- Skills grid adapts: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- Section padding adjusts for smaller screens
- All interactive elements remain accessible and properly sized

## Implementation Plan

### Phase 1: HTML Structure
1. Create `index.html` with complete semantic structure
2. Add all content sections with placeholder content
3. Include proper meta tags and accessibility attributes

### Phase 2: CSS Styling
1. Set up CSS custom properties (design tokens)
2. Implement base styles and typography
3. Style each section with neobrutalism aesthetic
4. Add responsive breakpoints
5. Implement form styling with error states

### Phase 3: JavaScript Functionality
1. Create form validation module
2. Implement validation logic for each field
3. Add error display/clearing functions
4. Implement submit handler
5. Add success feedback mechanism

### Phase 4: Testing & Refinement
1. Test across different browsers
2. Verify responsive behavior at all breakpoints
3. Conduct accessibility audit
4. Validate form functionality with various inputs
5. Performance testing and optimization

## Future Enhancements (Out of Scope)

These features are not included in the current requirements but could be added later:

1. **Projects Portfolio Section**: Gallery of completed projects
2. **Dark Mode Toggle**: Alternative color scheme
3. **Smooth Scroll Navigation**: Animated scrolling between sections
4. **Form Backend Integration**: Actual email sending via API
5. **Animations**: Scroll-triggered animations for sections
6. **Language Toggle**: Switch between Indonesian and English
7. **Downloadable Resume**: PDF download button
8. **Social Media Links**: Icons linking to LinkedIn, GitHub, etc.

## Conclusion

This design provides a complete blueprint for implementing Daniel Oscar Kantong's neobrutalism portfolio website. The architecture emphasizes simplicity, maintainability, and adherence to the neobrutalism aesthetic while ensuring accessibility, responsiveness, and robust form validation. By using only HTML, CSS, and vanilla JavaScript, the site will load quickly, work reliably across browsers, and be easy to host and maintain.
