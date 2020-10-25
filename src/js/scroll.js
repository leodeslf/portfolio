const MARGIN = 64; // 16rem * 4
let distToScroll = [];
let titles = undefined;
let links = undefined;

window.addEventListener('load', () => {
  titles = document.querySelectorAll('h1, h2');
  links = document.querySelectorAll('a.step');

  window.addEventListener('scroll', findActiveStep);

  findActiveStep();
});

const findActiveStep = () => {
  const SCROLLED = document.documentElement.scrollTop;
  let active = 0;

  // Find dintances relative to the scroll to top.
  titles.forEach((title, i) => {
    distToScroll[i] = title.offsetTop - MARGIN - SCROLLED;
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
