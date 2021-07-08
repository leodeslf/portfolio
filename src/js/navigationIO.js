const activeClass = 'step--active';

// Arrays and HTMLCollection of elements to observe and modify.
let HTMLSections, HTMLSteps, HTMLActiveStep;

// Aux. variable that holds the highest section to compare.
let HTMLHighestSection;

/**
 * Identify sections and steps. Start observing intersection on sections,
 * so we can update its respective step state.
 */
export default function initNavigationIO() {
  window.addEventListener('load', () => {
    HTMLSections = [...document.getElementsByTagName('section')];
    HTMLSteps = [...document.getElementsByClassName('step')];
    HTMLActiveStep = document.getElementsByClassName('step--active');

    const io = new IntersectionObserver(updateHighestSection);
    for (let item of HTMLSections) io.observe(item);
  });
}

function updateHighestSection(entries) {
  for (let { isIntersecting, target } of entries) {
    /**
     * Define target as the highest section if it is: 
     * - Visible;
     * - Not the current highest;
     * - Higher than the current highest;
     * - Or there is no highest.
     */
    if (isIntersecting) {
      if (target !== HTMLHighestSection) {
        if (!HTMLHighestSection || target.getBoundingClientRect().y <
          HTMLHighestSection?.getBoundingClientRect().y) {
          HTMLHighestSection = target;
        } else continue;
      } else continue;
    }

    /**
     * Define the section below the target if it is:
     * - Not visible.
     * - Actually the current highest.
     */
    if (!isIntersecting) {
      if (HTMLHighestSection === target) {
        HTMLHighestSection = HTMLSections[HTMLSections.indexOf(target) + 1];
      }
    }
  }

  updateActiveStep();
}

function updateActiveStep() {
  // Correspondant step of highest section is already the active one.
  if (HTMLHighestSection?.classList.contains(activeClass)) return;

  const i = HTMLSections.indexOf(HTMLHighestSection);

  // If there is another active step: "move" the class to the right one.
  if (HTMLActiveStep.length) {
    HTMLActiveStep.item(0).classList.remove(activeClass);
    HTMLSteps[i].classList.add(activeClass);
    return;
  }

  // Else: no one contains the active class.
  HTMLSteps[i].classList.add(activeClass);
}
