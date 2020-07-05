import React, { Component, lazy, Suspense } from 'react';
import Title from './components/Title.js';
import About from './components/About.js';
/* import Tools from './components/Tools.js';
import Projects from './components/Projects.js';
import Cv from './components/Cv.js';
import Contact from './components/Contact.js'; */
import Nav from './components/Nav.js';

const Tools = lazy(() => import(
  /* webpackChunkName: "Tools" */
  /* webpackPreload: true */
  './components/Tools'));
const Projects = lazy(() => import(
  /* webpackChunkName: "Projects" */
  /* webpackPreload: true */
  './components/Projects'));
const Cv = lazy(() => import(
  /* webpackChunkName: "Cv" */
  /* webpackPreload: true */'./components/Cv'));
const Contact = lazy(() => import(
  /* webpackChunkName: "Contact" */
  /* webpackPreload: true */
  './components/Contact'));

export default class Portfolio extends Component {
  render() {
    return (
      <>
        <main className="Portfolio">
          <Title />
          <About />
          <Suspense fallback={<div>Cargando...</div>}>
            <Tools />
            <Projects />
            <Cv />
            <Contact />
          </Suspense>
        </main>
        <aside>
          <Nav />
        </aside>
      </>
    );
  }
}
