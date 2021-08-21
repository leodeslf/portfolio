import Start from './components/Start';
import About from './components/About';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Cv from './components/Cv';
import Connect from './components/Connect';
import Aside from './components/Aside';
import LiveBG from './components/LiveBG';

export default function Portfolio() {
  return (
    <>
      <main className="portfolio">
        <Start />
        <About />
        <Projects />
        <Tools />
        <Cv />
        <Connect />
      </main>
      <Aside />
      <LiveBG />
    </>
  );
}
