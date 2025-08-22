 // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        
        // Check for saved theme preference or respect OS preference
        if (localStorage.getItem('theme') === 'dark' || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }
        
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });

        // Counter Game Functionality
        const counterValue = document.getElementById('counter-value');
        const decrementBtn = document.getElementById('decrement-btn');
        const resetBtn = document.getElementById('reset-btn');
        const incrementBtn = document.getElementById('increment-btn');
        const gameMessage = document.getElementById('game-message');
        
        let count = 0;
        
        function updateCounter() {
            counterValue.textContent = count;
            
            // Game logic
            if (count === 10) {
                gameMessage.textContent = "You won! Exactly 10!";
                gameMessage.style.color = "var(--success-color)";
            } else if (count > 10) {
                gameMessage.textContent = "Too high! Try going down.";
                gameMessage.style.color = "var(--error-color)";
            } else {
                gameMessage.textContent = "";
            }
        }
        
        decrementBtn.addEventListener('click', function() {
            count--;
            updateCounter();
        });
        
        resetBtn.addEventListener('click', function() {
            count = 0;
            updateCounter();
            gameMessage.textContent = "Counter reset!";
            setTimeout(() => {
                gameMessage.textContent = "";
            }, 2000);
        });
        
        incrementBtn.addEventListener('click', function() {
            count++;
            updateCounter();
        });

        // Form Validation Functionality
        const form = document.getElementById('validation-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const successMessage = document.getElementById('success-message');
        
        // Real-time validation
        nameInput.addEventListener('input', function() {
            validateName();
        });
        
        emailInput.addEventListener('input', function() {
            validateEmail();
        });
        
        passwordInput.addEventListener('input', function() {
            validatePassword();
        });
        
        function validateName() {
            if (nameInput.value.trim().length < 2) {
                nameError.style.display = 'block';
                return false;
            } else {
                nameError.style.display = 'none';
                return true;
            }
        }
        
        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.style.display = 'block';
                return false;
            } else {
                emailError.style.display = 'none';
                return true;
            }
        }
        
        function validatePassword() {
            // At least 8 chars, 1 number, 1 special char
            const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(passwordInput.value)) {
                passwordError.style.display = 'block';
                return false;
            } else {
                passwordError.style.display = 'none';
                return true;
            }
        }
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            
            if (isNameValid && isEmailValid && isPasswordValid) {
                successMessage.style.display = 'block';
                
                // Reset form after successful submission
                setTimeout(() => {
                    form.reset();
                    successMessage.style.display = 'none';
                }, 3000);
            }
        });
