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

        // Confirm-password removed: proceed with reset and redirect
        alert('Password reset successfully! Redirecting to login...');
        window.location.href = 'login.html';
    });
}
