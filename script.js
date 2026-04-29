// Click Here button hover effect
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
