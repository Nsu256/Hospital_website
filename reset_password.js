const resetForm = document.getElementById('resetForm');

if (resetForm) {
    resetForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (!resetForm.checkValidity()) {
            resetForm.reportValidity();
            return;
        }

        const username = document.getElementById('username') ? document.getElementById('username').value : '';
        const newPassword = document.getElementById('newpassword').value;
        const confirmEl = document.getElementById('confirmpassword');

        if (confirmEl) {
            const confirmPassword = confirmEl.value;
            if (newPassword !== confirmPassword) {
                alert('Passwords do not match. Please try again.');
                return;
            }
        }

        alert('Password reset successfully! Redirecting to login...');
        window.location.href = 'login.html';
    });
}
