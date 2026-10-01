// Contact Form Validation Module
// Handles validation, error display, and submission feedback for the contact form.

const ContactForm = {
  // DOM references, cached on init
  form: null,
  fields: {},

  /**
   * Initialize the module: cache DOM references and attach event listeners.
   * Must be called after the DOM is ready.
   */
  init() {
    this.form = document.getElementById('contactForm');

    if (!this.form) {
      console.error('ContactForm: #contactForm element not found in the DOM.');
      return;
    }

    this.fields = {
      name: document.getElementById('name'),
      email: document.getElementById('email'),
      message: document.getElementById('message'),
    };

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  /**
   * Validate a single field by name.
   * @param {string} field - The field name ('name' | 'email' | 'message')
   * @param {string} value - The current value of the field
   * @returns {{ valid: boolean, error: string }}
   */
  validateField(field, value) {
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
  },

  /**
   * Validate all form fields.
   * @returns {{ isValid: boolean, errors: Object.<string, string> }}
   */
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

  /**
   * Display an inline error message for a field and mark it invalid.
   * @param {string} fieldName - The field name
   * @param {string} message   - The error message to display
   */
  showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }
    if (this.fields[fieldName]) {
      this.fields[fieldName].classList.add('invalid');
    }
  },

  /**
   * Clear the inline error message for a field and remove invalid state.
   * @param {string} fieldName - The field name
   */
  clearError(fieldName) {
    const errorElement = document.getElementById(fieldName + 'Error');
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }
    if (this.fields[fieldName]) {
      this.fields[fieldName].classList.remove('invalid');
    }
  },

  /**
   * Show a form-level feedback message (success or error).
   * @param {string}  message   - The feedback message
   * @param {boolean} isSuccess - True for success styling, false for error styling
   */
  showFeedback(message, isSuccess) {
    const feedback = document.getElementById('formFeedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = 'form-feedback ' + (isSuccess ? 'success' : 'error');
    feedback.classList.add('visible');

    // Auto-hide after 5 seconds
    setTimeout(() => {
      feedback.classList.remove('visible');
    }, 5000);
  },

  /**
   * Handle the form submit event.
   * Prevents default submission, triggers validation, and shows feedback.
   * @param {Event} e - The submit event
   */
  handleSubmit(e) {
    e.preventDefault();

    const validation = this.validateForm();

    if (validation.isValid) {
      this.showFeedback('Thank you for your message! I will get back to you soon.', true);
      this.form.reset();
    } else {
      this.showFeedback('Please fix the errors above and try again.', false);
    }
  },
};

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ContactForm.init();
});
