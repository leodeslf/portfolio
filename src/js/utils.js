const MARGIN = 192;
let titles = undefined;
let steps = undefined;

window.addEventListener('load', () => {
  titles = document.getElementsByTagName('h2');
  steps = document.querySelectorAll('.step');

  steps.forEach(step => {
    // Listen to clicks.
    step.addEventListener('click', setActiveStep());
  });

  // Listen to scroll.
  window.addEventListener('scroll', setActiveStep);

  // Check current state.
  setActiveStep();
  console.log('loaded');
});

// Check for the active step.
const setActiveStep = () => {
  const SCROLLED = document.documentElement.scrollTop;

  // Check if first title is too low
  // Then, they all are too low (inactive).
  if (titles[0].offsetTop - MARGIN > SCROLLED) {
    steps.forEach(step => step.classList.remove('step--active'));
    return;
  }

  // If not, find the active one.
  for (let i = 0; i < titles.length; i++) {
    // If the next tilte is too low, current is the active one.
    if (titles[i + 1] && titles[i + 1].offsetTop - MARGIN > SCROLLED) {
      // Finally, add and remove the 'active' class respectively.
      for (let j = 0; j < titles.length; j++) {
        if (j === i) steps[j].classList.add('step--active');
        else steps[j].classList.remove('step--active');
      }
      return;
    }
  }
}