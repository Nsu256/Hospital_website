// START OF THE HERO SECTION

// Hero heading typewriter effect (fetch username from server)
const heroTitle = document.getElementById('heroTitle');
async function initHeroTypewriter() {
    if (!heroTitle) return;

    let username = 'Sonirisa';
    try {
        const resp = await fetch('get_user.php', {credentials: 'same-origin'});
        if (resp.ok) {
            const data = await resp.json();
            if (data && data.username) username = data.username;
        }
    } catch (e) {
        // ignore and use fallback
    }

    const heroTitleSegments = [
        { type: 'text', value: 'Welcome ' },
        { type: 'span', value: username },
        { type: 'text', value: ', to Mediplus ' },
        { type: 'lineBreak' },
        { type: 'span', value: 'Hospital' }
    ];

    let heroSegmentIndex = 0;
    let heroCharacterIndex = 0;

    function renderHeroTitle() {
        let heroTitleMarkup = '';

        for (let index = 0; index < heroSegmentIndex; index += 1) {
            const segment = heroTitleSegments[index];

            if (segment.type === 'text') {
                heroTitleMarkup += segment.value;
            } else if (segment.type === 'span') {
                heroTitleMarkup += `<span>${segment.value}</span>`;
            } else if (segment.type === 'lineBreak') {
                heroTitleMarkup += '<br>';
            }
        }

        const activeSegment = heroTitleSegments[heroSegmentIndex];
        if (!activeSegment) {
            heroTitle.innerHTML = '';
            return;
        }

        if (activeSegment.type === 'text') {
            heroTitleMarkup += activeSegment.value.slice(0, heroCharacterIndex);
        } else if (activeSegment.type === 'span') {
            heroTitleMarkup += `<span>${activeSegment.value.slice(0, heroCharacterIndex)}</span>`;
        }

        heroTitle.innerHTML = heroTitleMarkup;
    }

    function typeHeroTitle() {
        const activeSegment = heroTitleSegments[heroSegmentIndex];

        if (!activeSegment) {
            heroSegmentIndex = 0;
            heroCharacterIndex = 0;
            heroTitle.innerHTML = '';
            setTimeout(typeHeroTitle, 700);
            return;
        }

        if (activeSegment.type === 'lineBreak') {
            heroSegmentIndex += 1;
            heroCharacterIndex = 0;
            typeHeroTitle();
            return;
        }

        renderHeroTitle();

        if (heroCharacterIndex < activeSegment.value.length) {
            heroCharacterIndex += 1;
        } else {
            heroSegmentIndex += 1;
            heroCharacterIndex = 0;
        }

        setTimeout(typeHeroTitle, 200);
    }

    typeHeroTitle();
}

initHeroTypewriter();


// Navigation bar button hover effect
const navButton = document.querySelector('.navbtn button');
function navHoverEffect() {
	this.style.boxShadow = '0 0 10px navy';
}
if (navButton) navButton.addEventListener('mouseover', navHoverEffect);

function navResetEffect() {
	this.style.boxShadow = 'none';
}
if (navButton) navButton.addEventListener('mouseout', navResetEffect);

// Navigation link hover effect
const navLinks = document.querySelectorAll('.navanchours nav a');
navLinks.forEach(link => {
    function navLinkHover() {
        this.style.color = 'navy';
        this.style.textDecoration = 'underline';
        this.style.fontWeight = '800';
    }

    function navLinkReset() {
        this.style.color = 'black';
        this.style.textDecoration = 'none';
        this.style.fontWeight = 'normal';
    }

    link.addEventListener('mouseover', navLinkHover);
    link.addEventListener('mouseout', navLinkReset);
});


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

// Click Here button - show booked appointments
async function showBookedAppointments() {
    const modal = document.getElementById('appointmentsViewModal');
    const listEl = document.getElementById('appointmentsList');
    
    listEl.innerHTML = '<p>Loading appointments...</p>';
    modal.style.display = 'block';

    try {
        const res = await fetch('get_appointments.php?mine=1', { credentials: 'same-origin' });
        const data = await res.json();

        if (data.error) {
            listEl.innerHTML = '<p style="color: red;">Error: ' + data.error + '</p>';
            return;
        }

        const appts = data.appointments || [];
        if (appts.length === 0) {
            listEl.innerHTML = '<p>No appointments booked yet.</p>';
            return;
        }

        let html = '';
        appts.forEach((appt, idx) => {
            const date = new Date(appt.date).toLocaleString();
            html += `
                <div style="background: #f9f9f9; padding: 12px; margin: 10px 0; border-left: 4px solid #0084ff; border-radius: 4px;">
                    <div><strong>#${idx + 1} - Doctor:</strong> ${appt.doctor}</div>
                    <div><strong>Date & Time:</strong> ${date}</div>
                    <div><strong>Patient:</strong> ${appt.fullname}</div>
                    <div><strong>Email:</strong> ${appt.email}</div>
                    <div><strong>Phone:</strong> ${appt.phone}</div>
                    ${appt.notes ? `<div><strong>Notes:</strong> ${appt.notes}</div>` : ''}
                </div>
            `;
        });
        listEl.innerHTML = html;
    } catch (err) {
        console.error(err);
        listEl.innerHTML = '<p style="color: red;">Error loading appointments</p>';
    }
}

clickHereBtn.addEventListener('click', showBookedAppointments);


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
const navBookBtn = document.querySelector('#bookAppointmentNavBtn');
const heroBookBtn = document.querySelector('#herobtn2');

// Function to open the modal and click event listeners to open modal
function openModal() {
    appointmentModal.style.display = 'block';
}
navBookBtn.addEventListener('click', openModal);
heroBookBtn.addEventListener('click', openModal);

// Function to close the modal and click event listener to close button
function closeModal() {
    appointmentModal.style.display = 'none';
}
closeBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
function handleWindowClick(event) {
    if (appointmentModal && event.target === appointmentModal) {
        closeModal();
    }
    const appointmentsViewModal = document.getElementById('appointmentsViewModal');
    if (appointmentsViewModal && event.target === appointmentsViewModal) {
        appointmentsViewModal.style.display = 'none';
    }
}
window.addEventListener('click', handleWindowClick);

// Close appointments view modal
const closeApptViewBtn = document.getElementById('closeApptView');
if (closeApptViewBtn) {
    closeApptViewBtn.addEventListener('click', function() {
        document.getElementById('appointmentsViewModal').style.display = 'none';
    });
}

// Handle form submission via AJAX
const appointmentForm = document.getElementById('appointmentForm');
async function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!appointmentForm.checkValidity()) {
        appointmentForm.reportValidity();
        return;
    }

    const formData = new FormData(appointmentForm);

    try {
        const response = await fetch('process_appointment.php', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert('Appointment booked successfully!');
            appointmentForm.reset();
            closeModal();
            loadUserAppointments();
        } else {
            alert('Error: ' + (data.error || 'Failed to book appointment'));
        }
    } catch (err) {
        console.error(err);
        alert('Network error while booking appointment');
    }
}

if (appointmentForm)
	 appointmentForm.addEventListener('submit', handleFormSubmit);

// Fetch and display user's appointments
async function loadUserAppointments() {
    try {
        const res = await fetch('get_appointments.php?mine=1', { credentials: 'same-origin' });
        const data = await res.json();

        if (!data.appointments) {
            console.log('No appointments found or not authenticated');
            return;
        }

        // Create or update appointments list container
        let appointmentsList = document.getElementById('userAppointmentsList');
        if (!appointmentsList) {
            appointmentsList = document.createElement('div');
            appointmentsList.id = 'userAppointmentsList';
            appointmentsList.style.cssText = 'margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 8px;';
            
            // Insert after the modal
            const appointmentModal = document.getElementById('appointmentModal');
            if (appointmentModal.parentNode) {
                appointmentModal.parentNode.insertBefore(appointmentsList, appointmentModal.nextSibling);
            }
        }

        if (data.appointments.length === 0) {
            appointmentsList.innerHTML = '<h3>No appointments yet</h3>';
            return;
        }

        let html = '<h3>Your Appointments</h3>';
        data.appointments.forEach(appt => {
            const date = new Date(appt.date).toLocaleString();
            html += `
                <div style="background: white; padding: 12px; margin: 8px 0; border-left: 4px solid #0084ff; border-radius: 4px;">
                    <div><strong>Doctor:</strong> ${appt.doctor}</div>
                    <div><strong>Date:</strong> ${date}</div>
                    <div><strong>Patient:</strong> ${appt.fullname}</div>
                    <div><strong>Contact:</strong> ${appt.email} | ${appt.phone}</div>
                    ${appt.notes ? `<div><strong>Notes:</strong> ${appt.notes}</div>` : ''}
                </div>
            `;
        });
        appointmentsList.innerHTML = html;
    } catch (err) {
        console.error('Error loading appointments:', err);
    }
}

// END OF THE MODAL SECTION


// START OF THE SERVICES SECTION

// Service cards horizontal scrolling
const servicesCards = document.querySelector('.servicescards');
if (servicesCards) {
    const originalCards = Array.from(servicesCards.querySelectorAll('.card'));

    if (originalCards.length) {
        const track = document.createElement('div');
        track.className = 'servicescards-track';

        const firstGroup = document.createElement('div');
        firstGroup.className = 'servicescards-group';

        originalCards.forEach(card => {
            firstGroup.appendChild(card);
        });

        const secondGroup = firstGroup.cloneNode(true);

        track.appendChild(firstGroup);
        track.appendChild(secondGroup);

        servicesCards.appendChild(track);
    }
}

// END OF THE SERVICES SECTION


// START OF THE DOCTOR CARDS SECTION

// Get all doctor cards
const doctorCards = document.querySelectorAll('.doctorcard');

// Function for when mouse is over the card
function doctorCardHover() {
    this.style.transform = 'scale(1.1) translateY(-10px)';
    this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    this.style.transition = 'all 0.3s ease-in-out';
}

// Function for when mouse leaves the card
function doctorCardReset() {
    this.style.transform = 'scale(1) translateY(0)';
    this.style.boxShadow = 'none';
    this.style.transition = 'all 0.3s ease-in-out';
}

// Add hover effect to each doctor card
doctorCards.forEach(card => {
    card.addEventListener('mouseover', doctorCardHover);
    card.addEventListener('mouseout', doctorCardReset);
});

// END OF THE DOCTOR CARDS SECTION


// START OF THE MEDICAL FORM SECTION

// Get medical form
const medicalForm = document.getElementById('medicalForm');

// Validation function
function validateMedicalForm() {
    const inputs = medicalForm.querySelectorAll('input');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '1px solid gray';
        }
    });

    return isValid;
}

// Handle medical form submission
function handleMedicalFormSubmit(event) {
    if (validateMedicalForm()) {
        return;
    } else {
        event.preventDefault();
        alert('Please fill in all fields');
    }
}

if (medicalForm)
    medicalForm.addEventListener('submit', handleMedicalFormSubmit);

// END OF THE MEDICAL FORM SECTION