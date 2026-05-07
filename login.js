// Display error messages from query params
const params = new URLSearchParams(window.location.search);
const errorCode = params.get('error');
const errorMessage = document.getElementById('errorMessage');

const errorMessages = {
    'invalid': 'Invalid username or password. Please try again.',
    'missing': 'Please enter both username and password.',
    'server': 'Server error. Please try again later.',
    'user_not_found': 'User not found.'
};

if (errorCode && errorMessages[errorCode]) {
    errorMessage.textContent = errorMessages[errorCode];
    errorMessage.style.display = 'block';
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        if (!loginForm.checkValidity()) {
            event.preventDefault();
            loginForm.reportValidity();
        }
    });
}