import React, { lazy, Suspense } from 'react';

const Title = lazy(() => import(/* webpackChunkName: "title" */ './components/Title'));
const About = lazy(() => import(/* webpackChunkName: "about" */ './components/About.js'));
const Tools = lazy(() => import(/* webpackChunkName: "tools" */ './components/Tools.js'));
const Projects = lazy(() => import(/* webpackChunkName: "projects" */ './components/Projects.js'));
const Cv = lazy(() => import(/* webpackChunkName: "cv" */ './components/Cv.js'));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ './components/Contact.js'));
const Stepper = lazy(() => import(/* webpackChunkName: "stepper" */ './components/Stepper.js'));
const DarkMode = lazy(() => import(/* webpackChunkName: "darkmode" */ './components/DarkMode.js'));

export default function Portfolio() {
  return (
    <Suspense fallback="">
      <main className="Portfolio">
        <Title />
        <About />
        <Tools />
        <Projects />
        <Cv />
        <Contact />
      </main>
      <aside>
        <Stepper />
        <DarkMode />
      </aside>
    </Suspense>
  );
}
