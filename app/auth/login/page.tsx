document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorContainer = document.getElementById('errorContainer');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        errorContainer.innerHTML = '';
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validation
        let isValid = true;
        let errors = [];
        
        if (!email) {
            errors.push('Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        if (!password) {
            errors.push('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            errors.push('Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) {
            displayErrors(errors);
            return;
        }
        
        // Simulate login request
        simulateLogin(email, password)
            .then(response => {
                // Redirect on successful login
                window.location.href = '/dashboard';
            })
            .catch(error => {
                displayErrors([error.message || 'Login failed. Please try again.']);
            });
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function displayErrors(errors) {
        errors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.className = 'alert alert-danger';
            errorElement.textContent = error;
            errorContainer.appendChild(errorElement);
        });
    }
    
    function simulateLogin(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Mock validation - in real app, this would be a server call
                const testEmail = 'user@example.com';
                const testPassword = 'password123';
                
                if (email === testEmail && password === testPassword) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 1000);
        });
    }
});
