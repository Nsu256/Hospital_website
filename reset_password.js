const resetForm = document.getElementById('resetForm');

if (resetForm) {
    resetForm.addEventListener('submit', function (event) {
        if (!resetForm.checkValidity()) {
            event.preventDefault();
            resetForm.reportValidity();
            return;
        }
    });
}
