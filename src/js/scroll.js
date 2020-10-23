const PADDING = 128; // 16 * 6
let titles = undefined;
let steps = undefined;

window.addEventListener('load', () => {
  titles = document.querySelectorAll('h1, h2');
  steps = document.querySelectorAll('.step');

  steps.forEach(step => {
    // Listen to clicks.
    step.addEventListener('click', setActiveStep());
  });

  // Listen to scroll.
  window.addEventListener('scroll', setActiveStep);

  // Check current state.
  setActiveStep();
});

// Check for the active step.
const setActiveStep = () => {
  const SCROLLED = document.documentElement.scrollTop;

  // If not, find the active one.
  for (let i = 0; i < titles.length; i++) {
    // Check if current (i) is the active one.
    if (
      // The next one is too low (and it exists) or...
      (titles[i + 1] && titles[i + 1].offsetTop - PADDING > SCROLLED) ||
      // It (i) is the last one.
      (i === titles.length - 1)
    ) {
      // Finally, add and remove the 'active' class respectively.
      for (let j = 0; j < titles.length; j++) {
        if (j === i) steps[j].classList.add('step--active');
        else steps[j].classList.remove('step--active');
      }
      return;
    }
  }
}
