let distToScroll = [];
let titles = undefined;
let links = undefined;

export function startListeningToScroll() {
  window.addEventListener('load', () => {
    const hash = window.location.hash;
    // Auto scroll to hash if it's the first load of this session.
    if (hash && !window.sessionStorage.getItem('hash')) {
      const offsetTop = document.querySelector(hash).offsetTop;
      window.scrollTo(0, offsetTop);
      window.sessionStorage.setItem('hash', hash);
    } else window.sessionStorage.setItem('hash', 0);

    // Identify titles, links and listen to scroll to update active step.
    titles = document.querySelectorAll('.portfolio__elem');
    links = document.querySelectorAll('.step');
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
