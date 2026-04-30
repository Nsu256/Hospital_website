// START OF THE HERO SECTION

// Hero heading typewriter effect
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
    const heroTitleSegments = [
        { type: 'text', value: 'Tu ' },
        { type: 'span', value: 'Sonirisa' },
        { type: 'text', value: ', tu mejor ' },
        { type: 'lineBreak' },
        { type: 'span', value: 'PRESENTACION' }
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