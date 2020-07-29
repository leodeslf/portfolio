import React, { lazy, Suspense } from 'react';

const BASE = './components/';

const Title = lazy(() =>
  import( /* webpackChunkName: "title" */ `${BASE}Title`));
const About = lazy(() =>
  import( /* webpackChunkName: "about" */ `${BASE}About.js`));
const Tools = lazy(() =>
  import( /* webpackChunkName: "tools" */ `${BASE}Tools.js`));
const Projects = lazy(() =>
  import( /* webpackChunkName: "projects" */ `${BASE}Projects.js`));
const Cv = lazy(() =>
  import( /* webpackChunkName: "cv" */ `${BASE}Cv.js`));
const Contact = lazy(() =>
  import( /* webpackChunkName: "contact" */ `${BASE}Contact.js`));
const StepperNav = lazy(() =>
  import( /* webpackChunkName: "stepper" */ `${BASE}StepperNav.js`));
const DarkModeSwitch = lazy(() =>
  import( /* webpackChunkName: "darkmode" */ `${BASE}DarkModeSwitch.js`));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
        <Title />
        <About />
        <Tools />
        <Projects />
        <Cv />
        <Contact />
      </main>
      <aside>
        <StepperNav />
        <DarkModeSwitch />
      </aside>
    </Suspense>
  );
}
