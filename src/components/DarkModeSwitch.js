import React, { Component } from 'react';

const LOCAL_COLOR_SCHEME = () => localStorage.getItem('dark-color-scheme');
const MEDIA_PREFERS_DARK = window.matchMedia('(prefers-color-scheme: dark)');

export default class DarkModeSwitch extends Component {
  constructor() {
    super();
    this.state = {
      checked: document.body.classList.value === 'dark'
    }
  }

  componentDidMount() {
    // Automatic change.
    MEDIA_PREFERS_DARK.onchange = e => {
      if (LOCAL_COLOR_SCHEME() === null) this.setState({ checked: e.matches });
    }
  }

  handleOnChange = e => {
    this.setState({ checked: e.target.checked });
    resetColoScheme(e.target.checked);
  }

  render() {
    return (
      <span className="dark-mode-switch">
        <input
          id="dark-mode-switch__input"
          className="dark-mode-switch__input"
          type="checkbox"
          checked={this.state.checked}
          onChange={this.handleOnChange} />
        <label
          className="dark-mode-switch__label"
          htmlFor="dark-mode-switch__input"
          title="Cambiar modo de color">
          <span className="label__body" />
        </label>
      </span>
    );
  }
}

const META_THEME_COLOR = document.querySelector('meta[name="theme-color"]');

// Manual change.
function resetColoScheme(checked) {
  if (checked) {
    document.body.classList.add('dark');
    META_THEME_COLOR.setAttribute('content', '#1c1c22');
    localStorage.setItem('dark-color-scheme', 'true');
  } else {
    document.body.classList.remove('dark');
    META_THEME_COLOR.setAttribute('content', '#fff');
    localStorage.setItem('dark-color-scheme', 'false');
  }
}

/**
 * Vanilla implementation github.com/coliff/dark-mode-switch
 * Additional info css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 */
