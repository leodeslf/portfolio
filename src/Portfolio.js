import React, { lazy, Suspense } from 'react';

const ORIGIN = './components/';

const About = lazy(() => import( /* webpackChunkName: "about" */ `${ORIGIN}About.js`));
const Tools = lazy(() => import( /* webpackChunkName: "tools" */ `${ORIGIN}Tools.js`));
const Projects = lazy(() => import( /* webpackChunkName: "projects" */ `${ORIGIN}Projects.js`));
const Cv = lazy(() => import( /* webpackChunkName: "cv" */ `${ORIGIN}Cv.js`));
const Contact = lazy(() => import( /* webpackChunkName: "contact" */ `${ORIGIN}Contact.js`));
const StepperNav = lazy(() => import( /* webpackChunkName: "steppernav" */ `${ORIGIN}StepperNav.js`));
const DarkModeSwitch = lazy(() => import( /* webpackChunkName: "darkmodeswitch" */ `${ORIGIN}DarkModeSwitch.js`));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="portfolio">
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
