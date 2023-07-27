const getY = (element) => element.getBoundingClientRect().y;
const activeClass = 'step--active';
let sections, steps, activeStep, activeSection;

function initNavigationFeedback() {
  window.addEventListener('load', () => {
    sections = [...document.getElementsByTagName('section')];
    steps = [...document.getElementsByClassName('step')];
    activeStep = document.getElementsByClassName('step--active');

    const io = new IntersectionObserver(updateHighestSection);
    for (let section of sections) io.observe(section);
  });
}

function updateHighestSection(entries) {
  // Get the new highest visible section (if any) to only update if needed.
  for (let { isIntersecting, target } of entries) {
    // If ther's no higher or the target is highest than the current one.
    if (!activeSection ||
      (isIntersecting && getY(target) < getY(activeSection))) {
      activeSection = target;
      updateActiveStep();
    }

    // If the current highest turns out of the screen.
    if (!isIntersecting && target === activeSection) {
      activeSection = getY(target) <= 0 ?
        // If it's above, pick the next one below it.
        sections[sections.indexOf(target) + 1] :
        // If it's below, there are no sections on screen.
        undefined
      updateActiveStep();
    }
  }
}

function updateActiveStep() {
  activeStep[0]?.classList.remove(activeClass);
  const i = sections.indexOf(activeSection);
  if (i > -1) steps[i].classList.add(activeClass);
}

export default initNavigationFeedback;
