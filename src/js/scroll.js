let distToScroll = [];
let titles = undefined;
let links = undefined;

export function startListeningScroll() {
  window.addEventListener('load', () => {
    const fragment = window.location.hash;    
    // Auto scroll to fragment if it's the first load of this session.
    if (fragment && !window.sessionStorage.getItem('fragment')) {
      const offsetTop = document.querySelector(fragment).offsetTop;
      window.scrollTo(0, offsetTop);
      window.sessionStorage.setItem('fragment', fragment);
    } else window.sessionStorage.setItem('fragment', 0);

    // Save fragments and their respective links.
    titles = document.querySelectorAll('.portfolio > .portfolio__elem');
    links = document.querySelectorAll('.step');

    // Listen to scroll to update the active 'step' of the stepper nav.
    window.addEventListener('scroll', findActiveStep);

    // Find current active step.
    findActiveStep();
  });
}

const findActiveStep = () => {
  const SCROLLED = document.documentElement.scrollTop;
  let active = 0;

  // Find dintances relative to the scroll to top.
  titles.forEach((title, i) => {
    // -1 for a safe margin.
    distToScroll[i] = title.offsetTop - SCROLLED - 1;
  });

  // Find the ones that are on 'range' / 'focus'.
  distToScroll.forEach((dist, i) => {
    if (dist <= 0) active = i;
  });

  links.forEach((step, i) => {
    i === active ?
      step.classList.add('step--active') :
      step.classList.remove('step--active');
  });
}
