import React, { Component } from 'react'

/**
 * If defined: "false" || "true".
 * If not: null.
 */
const INIT_COLOR = localStorage.getItem('colorScheme');
const DARK_MEDIA = window.matchMedia('(prefers-color-scheme: dark)');

export default class DarkMode extends Component {
  constructor() {
    super();
    this.hasManualConfig = INIT_COLOR !== null;
    this.state = {

      // Sett current state of color scheme
      isDark: this.hasManualConfig ?
        (INIT_COLOR === 'true' ? true : false) :
        DARK_MEDIA.matches
    }
    this.metaTag = document.querySelector('meta[name="theme-color"]');
  }

  componentDidMount() {

    // Sets current state of color scheme (if it exists)
    if (this.state.isDark) document.body.classList.add('dark');
    // this.metaTag.setAttribute('content', '')

    // Listen to media
    DARK_MEDIA.addListener(e => {
      if (this.hasManualConfig) {
        return;
      } else {
        this.resetScheme(e.matches, false);
      }
    })
  }

  resetScheme(darkModeOn, save) {
    if (darkModeOn) {
      /**
       * If used:
       * - Add class for CSS
       */
      document.body.classList.add('dark');
      if (save) {
        this.hasManualConfig = true;
        localStorage.setItem('colorScheme', 'true');
      }
    }
    else {
      /**
       * If not:
       * - Remove class for CSS
       */
      document.body.classList.remove('dark');
      if (save) {
        this.hasManualConfig = true;
        localStorage.setItem('colorScheme', 'false');
      }
    }
    // Finally update state
    this.setState({ isDarkMode: darkModeOn });
  }

  render() {
    return (
      <span className="dark-mode">
        <input
          id="mode"
          className="dark-mode__input"
          type="checkbox"
          defaultChecked={this.state.isDark}
          onChange={e => this.resetScheme(e.target.checked, true)} />
        <label
          className="dark-mode__label"
          htmlFor="mode" title="Cambiar modo de color">
        </label>
      </span>
    );
  }
}

/**
 * Vanilla implementation github.com/coliff/dark-mode-switch
 * Additional info css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 */
