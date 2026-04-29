// START OF THE HERO SECTION

// Hero button one hover effect
const clickHereBtn = document.querySelector('.herobtn1');

function hoverEffect() {
    this.style.backgroundColor = 'transparent';
    this.style.color = 'black';
	this.style.border = '2px solid black';
}
clickHereBtn.addEventListener('mouseover', hoverEffect);

function resetEffect() {
    this.style.backgroundColor = 'rgb(0, 132, 255)';
    this.style.color = 'white';
	this.style.border = 'none';
}
clickHereBtn.addEventListener('mouseout', resetEffect);


// Hero button two hover effect
const bookAppointmentBtn = document.querySelector('#herobtn2');

function btnTwoHover() {
    this.style.backgroundColor = 'rgb(0, 132, 255)';
    this.style.color = 'white';
	this.style.border = 'none';
}
bookAppointmentBtn.addEventListener('mouseover', btnTwoHover);

function btnTwoReset() {
    this.style.backgroundColor = 'transparent';
    this.style.color = 'black';
    this.style.border = '2px solid black';
}
bookAppointmentBtn.addEventListener('mouseout', btnTwoReset);

// END OF THE HERO SECTION


// START OF THE MODAL SECTION

// Get the modal
const appointmentModal = document.getElementById('appointmentModal');
const closeBtn = document.querySelector('.close');

// Get all Book Appointment buttons
const navBookBtn = document.querySelector('.navbtn button');
const heroBookBtn = document.querySelector('#herobtn2');

// Function to open the modal
function openModal() {
    appointmentModal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    appointmentModal.style.display = 'none';
}

// Add click event listeners to open modal
navBookBtn.addEventListener('click', openModal);
heroBookBtn.addEventListener('click', openModal);

// Add click event listener to close button
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
function handleWindowClick(event) {
    if (appointmentModal && event.target === appointmentModal) {
        closeModal();
    }
}
window.addEventListener('click', handleWindowClick);

// Handle form submission
const appointmentForm = document.getElementById('appointmentForm');

function handleFormSubmit(event) {
    event.preventDefault();
    alert('Appointment booked successfully! We will contact you soon.');
    closeModal();
    if (appointmentForm)
		 appointmentForm.reset();
}

if (appointmentForm)
	 appointmentForm.addEventListener('submit', handleFormSubmit);

// END OF THE MODAL SECTION