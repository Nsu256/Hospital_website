// Hero button one hover effect
const clickHereBtn = document.querySelector('.herobtn1');

function hoverEffect() {
    this.style.backgroundColor = 'white';
    this.style.color = 'navy';
}
clickHereBtn.addEventListener('mouseover', hoverEffect);

function resetEffect() {
    this.style.backgroundColor = 'rgb(0, 132, 255)';
    this.style.color = 'white';
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