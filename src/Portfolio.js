import React from 'react';
import Title from './components/Title.js';
import About from './components/About.js';
import Tools from './components/Tools.js';
import Projects from './components/Projects.js';
import Cv from './components/Cv.js';
import Contact from './components/Contact.js';
import Stepper from './components/Stepper.js';
import DarkMode from './components/DarkMode.js';

export default function Portfolio() {
  return (
    <>
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
    </>
  );
}
