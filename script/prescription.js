// Prescription Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    const prescriptionForm = document.querySelector('.prescription-form');
    const fileInput = document.querySelector('#prescription-file');
    const filePreview = document.querySelector('.file-preview');
    const uploadButton = document.querySelector('.upload-btn');

    // File upload handling
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                showError('Please upload a valid file (JPEG, PNG, or PDF)');
                return;
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showError('File size should be less than 5MB');
                return;
            }

            // Show file preview
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    filePreview.innerHTML = `
                        <img src="${e.target.result}" alt="Prescription Preview">
                        <button class="remove-file">×</button>
                    `;
                };
                reader.readAsDataURL(file);
            } else {
                filePreview.innerHTML = `
                    <div class="pdf-preview">
                        <i class="fas fa-file-pdf"></i>
                        <p>${file.name}</p>
                        <button class="remove-file">×</button>
                    </div>
                `;
            }

            // Add remove file functionality
            const removeButton = filePreview.querySelector('.remove-file');
            removeButton.addEventListener('click', () => {
                fileInput.value = '';
                filePreview.innerHTML = '';
            });
        }
    });

    // Form validation and submission
    prescriptionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = prescriptionForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showError(`${field.previousElementSibling.textContent} is required`);
            }
        });

        if (!fileInput.files.length) {
            isValid = false;
            showError('Please upload your prescription');
        }

        if (isValid) {
            // Show loading state
            const submitButton = prescriptionForm.querySelector('.submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Reset form
                prescriptionForm.reset();
                filePreview.innerHTML = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Prescription submitted successfully!';
                document.body.appendChild(successMessage);

                // Remove message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        }
    });

    // Error message helper function
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);

        // Remove error message after 3 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 3000);
    }

    // Drag and drop functionality
    const dropZone = document.querySelector('.file-upload');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('highlight');
    }

    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        fileInput.dispatchEvent(new Event('change'));
    }
}); 