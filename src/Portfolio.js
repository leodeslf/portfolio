import React, { Component } from 'react';
import Title from './components/Title.js';
import About from './components/About.js';
import Tools from './components/Tools.js';
import Projects from './components/Projects.js';
import Cv from './components/Cv.js';
import Contact from './components/Contact.js';
import Nav from './components/Nav.js';

export default class Portfolio extends Component {
  render() {
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
          <Nav />
        </aside>
      </>
    );
  }
}

/* {
    "id": 1,
  "title": "Familiarizado",
  "tool_list": [
    "Java",
    "VisualBasic.NET",
    "SQL",
    "MySQL",
    "Linux Bash"
  ]
}, */
