import React, { Component } from 'react'

const META_THEME_COLOR = document.querySelector('meta[name="theme-color"]');

function manualColorScheme(darkModeOn) {
  if (darkModeOn) {
    document.body.classList.add('dark');
    META_THEME_COLOR.setAttribute('content', '#1c1c22');
    localStorage.setItem('color-scheme', 'true');
  } else {
    document.body.classList.remove('dark');
    META_THEME_COLOR.setAttribute('content', '#fff');
    localStorage.setItem('color-scheme', 'false');
  }
}

export default class DarkMode extends Component {
  constructor() {
    super();
    this.state = {
      isDark: document.body.classList.value === 'dark'
    }
  }

  // Handle for manual changes
  handleResetColorScheme(darkModeOn) {
    manualColorScheme(darkModeOn);
    this.setState({ isDarkMode: darkModeOn });
  }

  render() {
    return (
      <span className="dark-mode">
        <input
          id="dark-mode-input"
          className="dark-mode__input"
          type="checkbox"
          defaultChecked={this.state.isDark}
          onChange={e => this.handleResetColorScheme(e.target.checked)} />
        <label
          className="dark-mode__label"
          htmlFor="dark-mode-input"
          title="Cambiar modo de color">
          <span className="label__body" />
        </label>
      </span>
    );
  }
}

/**
 * Vanilla implementation github.com/coliff/dark-mode-switch
 * Additional info css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 */
