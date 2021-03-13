let distToScroll = [];
let titles = undefined;
let links = undefined;

export function startListeningScroll() {
  window.addEventListener('load', () => {
    titles = document.querySelectorAll('.portfolio > .portfolio__elem');
    links = document.querySelectorAll('.step');
  
    window.addEventListener('scroll', findActiveStep);
  
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
