// Contact Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Form validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value.trim() === '') {
                input.classList.add('error');
                showError(input, 'This field is required');
            } else {
                input.classList.remove('error');
                removeError(input);
            }
        });

        // Email validation
        if (input.type === 'email') {
            input.addEventListener('input', () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.classList.add('error');
                    showError(input, 'Please enter a valid email address');
                } else {
                    input.classList.remove('error');
                    removeError(input);
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        formInputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
                showError(input, 'This field is required');
            }
        });

        if (isValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('.submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Message sent successfully!';
                document.body.appendChild(successMessage);

                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        }
    });

    // Error message helper functions
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    function removeError(input) {
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    // Map interaction
    const mapContainer = document.querySelector('.map-container');
    mapContainer.addEventListener('mouseenter', () => {
        mapContainer.style.transform = 'scale(1.02)';
        mapContainer.style.transition = 'transform 0.3s ease';
    });

    mapContainer.addEventListener('mouseleave', () => {
        mapContainer.style.transform = 'scale(1)';
    });
}); 