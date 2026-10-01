# Requirements Document

## Introduction

This document specifies the requirements for a personal portfolio website for Daniel Oscar Kantong. The website will feature a neobrutalism design style (bold, high-contrast, eye-catching) with a single-page scroll layout. The primary purpose is to present Daniel's professional profile, skills, work experience, and education to potential employers in a quick and engaging format. The website will be built using vanilla HTML, CSS, and JavaScript without any frameworks.

## Glossary

- **Portfolio_Website**: The single-page web application displaying Daniel Oscar Kantong's professional information
- **Visitor**: Any person accessing the Portfolio_Website through a web browser
- **Employer**: A Visitor who is a potential employer seeking to review Daniel's qualifications
- **Neobrutalism_Style**: A design aesthetic characterized by bold colors, thick borders, high contrast, and brutalist-inspired visual elements
- **Profile_Section**: The section displaying Daniel's personal introduction and professional summary
- **Skills_Section**: The section listing Daniel's technical competencies including HTML, CSS, JavaScript, and React
- **Experience_Section**: The section detailing Daniel's work history at PT Kode Evolusi Bangsa and ForeverVacation Bali
- **Education_Section**: The section presenting Daniel's academic background (Bachelor's degree in Computer Science)
- **Contact_Form**: An interactive form allowing Employers to send messages to Daniel
- **Single_Page_Layout**: A web page design where all content is accessible through vertical scrolling without page navigation

## Requirements

### Requirement 1: Visual Design and Style

**User Story:** As an Employer, I want to see a visually striking and professional portfolio, so that I can quickly assess Daniel's design sensibility and attention to detail.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL implement the Neobrutalism_Style with bold colors, thick borders, and high-contrast elements
2. THE Portfolio_Website SHALL use a Single_Page_Layout structure
3. THE Portfolio_Website SHALL be built using only HTML, CSS, and JavaScript without external frameworks
4. THE Portfolio_Website SHALL display all content sections in a vertical scrolling format
5. THE Portfolio_Website SHALL maintain visual consistency across all sections

### Requirement 2: Profile Information Display

**User Story:** As an Employer, I want to quickly learn about Daniel's professional background, so that I can determine if he matches my hiring needs.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the Profile_Section containing Daniel Oscar Kantong's name and professional introduction
2. THE Profile_Section SHALL appear at the top of the Single_Page_Layout
3. THE Profile_Section SHALL present information in a clear and readable format
4. THE Profile_Section SHALL follow the Neobrutalism_Style design aesthetic

### Requirement 3: Skills Presentation

**User Story:** As an Employer, I want to see Daniel's technical skills at a glance, so that I can quickly evaluate his technical capabilities.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the Skills_Section listing Daniel's technical competencies
2. THE Skills_Section SHALL include HTML as a displayed skill
3. THE Skills_Section SHALL include CSS as a displayed skill
4. THE Skills_Section SHALL include JavaScript as a displayed skill
5. THE Skills_Section SHALL include React as a displayed skill
6. THE Skills_Section SHALL present skills as a simple organized list or grid of icons or badges without proficiency level indicators

### Requirement 4: Work Experience Display

**User Story:** As an Employer, I want to review Daniel's work history, so that I can understand his professional experience and background.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the Experience_Section containing Daniel's work history
2. THE Experience_Section SHALL include information about employment at PT Kode Evolusi Bangsa
3. THE Experience_Section SHALL include information about employment at ForeverVacation Bali
4. THE Experience_Section SHALL present work experience in chronological or prioritized order
5. THE Experience_Section SHALL display each position with sufficient detail for Employer evaluation

### Requirement 5: Educational Background

**User Story:** As an Employer, I want to see Daniel's educational qualifications, so that I can verify his academic credentials.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL display the Education_Section containing Daniel's academic background
2. THE Education_Section SHALL indicate Daniel holds a Bachelor's degree in Computer Science (Sarjana Ilmu Komputer)
3. THE Education_Section SHALL present educational information in a clear format

### Requirement 6: Contact Functionality

**User Story:** As an Employer, I want to contact Daniel directly through the website, so that I can initiate communication about potential opportunities.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL provide the Contact_Form for Employers to send messages
2. THE Contact_Form SHALL include an input field for the Employer's name
3. THE Contact_Form SHALL include an input field for the Employer's email address
4. THE Contact_Form SHALL include a text area for the Employer's message
5. THE Contact_Form SHALL include a submit button to send the message
6. WHEN the Employer submits the Contact_Form, THE Portfolio_Website SHALL validate that required fields are filled
7. WHEN the Contact_Form is successfully submitted, THE Portfolio_Website SHALL provide confirmation feedback to the Employer as a best-effort UI feature
8. THE Portfolio_Website SHALL determine Contact_Form submission success based solely on backend receipt of the message independent of confirmation feedback display

### Requirement 7: Content Exclusions

**User Story:** As a Developer, I want to ensure the website meets the specified scope, so that development remains focused and efficient.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL NOT include a projects portfolio section
2. THE Portfolio_Website SHALL focus content exclusively on Profile_Section, Skills_Section, Experience_Section, Education_Section, and Contact_Form

### Requirement 8: Browser Compatibility and Performance

**User Story:** As an Employer, I want the website to load quickly and work in my browser, so that I can review Daniel's portfolio without technical issues.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL load and display correctly in modern web browsers
2. WHEN a Visitor accesses the Portfolio_Website, THE Portfolio_Website SHALL render all sections within a reasonable timeframe
3. THE Portfolio_Website SHALL be responsive to different screen sizes
4. THE Portfolio_Website SHALL function without requiring external framework dependencies
