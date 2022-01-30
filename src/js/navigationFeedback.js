const getY = (element) => element.getBoundingClientRect().y;
const activeClass = 'step--active';

let sections, steps, activeStep, highestVisibleSection;

/**
 * Identify sections and steps. Start observing intersection on sections,
 * to update its respective step class.
 */
export default function initNavigationIO() {
  window.addEventListener('load', () => {
    sections = [...document.getElementsByTagName('section')];
    steps = [...document.getElementsByClassName('step')];
    activeStep = document.getElementsByClassName('step--active');

    const io = new IntersectionObserver(updateHighestVisibleSection);
    for (let section of sections) io.observe(section);
  });
}

function updateHighestVisibleSection(entries) {
  let activeStepNeedsUpdate = false;

  for (let { isIntersecting, target } of entries) {
    /**
     * Set "target" as the "highest visible section" if it is:
     * - Visible and not the current highest.
     * - There is no highest or it's higher than it.
     */
    if (
      (isIntersecting && target !== highestVisibleSection) &&
      (!highestVisibleSection || getY(target) < getY(highestVisibleSection))
    ) {
      highestVisibleSection = target;
      activeStepNeedsUpdate = true;
    }

    /**
     * Set the section inmediately below "target" as the "highest visible
     * section" if "target" is:
     * - The current highest but no longer visible.
     */
    if (!isIntersecting && target === highestVisibleSection) {
      highestVisibleSection = sections[sections.indexOf(target) + 1];
      activeStepNeedsUpdate = true;
    }
  }

  if (activeStepNeedsUpdate) updateActiveStep();
}

function updateActiveStep() {
  const i = sections.indexOf(highestVisibleSection);

  // If no sections are visible on screen (i = -1).
  if (i < 0) return;

  activeStep[0]?.classList.remove(activeClass);
  steps[i].classList.add(activeClass);
}
