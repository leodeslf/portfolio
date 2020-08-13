import React, { lazy, Suspense } from 'react';

const ROOT = './components/';

const About = lazy(() => import( /* webpackChunkName: "about" */ `${ROOT}About.js`));
const Tools = lazy(() => import( /* webpackChunkName: "tools" */ `${ROOT}Tools.js`));
const Projects = lazy(() => import( /* webpackChunkName: "projects" */ `${ROOT}Projects.js`));
const Cv = lazy(() => import( /* webpackChunkName: "cv" */ `${ROOT}Cv.js`));
const Contact = lazy(() => import( /* webpackChunkName: "contact" */ `${ROOT}Contact.js`));
const StepperNav = lazy(() => import( /* webpackChunkName: "steppernav" */ `${ROOT}StepperNav.js`));
const DarkModeSwitch = lazy(() => import( /* webpackChunkName: "darkmodeswitch" */ `${ROOT}DarkModeSwitch.js`));

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
