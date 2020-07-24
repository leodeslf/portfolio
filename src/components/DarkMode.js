import React, { Component } from 'react'
import resetColorScheme from '../js/darkModeUtil';

// LOCAL_COLOR_SCHEME = "false" || "true" || null
const LOCAL_COLOR_SCHEME = localStorage.getItem('color-scheme');
const MEDIA_PREFERS_DARK = window.matchMedia('(prefers-color-scheme: dark)');

export default class DarkMode extends Component {
  constructor() {
    super();
    this.isManual = LOCAL_COLOR_SCHEME !== null;
    this.state = {
      isDark: this.isManual ?
        (LOCAL_COLOR_SCHEME === 'true') :
        MEDIA_PREFERS_DARK.matches
    }
  }

  componentDidMount() {
    if (this.state.isDark) {
      resetColorScheme(true, false);
    }

    // Listen to change automatically, unless
    // user has already changed it manually
    MEDIA_PREFERS_DARK.addListener(e => {
      if (!this.isManual) {
        resetColorScheme(e.matches, false);
      } else {
        return;
      }
    })
  }

  // Handle for manual changes
  handleResetColorScheme(darkModeOn) {
    resetColorScheme(darkModeOn, true);
    this.setState({ isDarkMode: darkModeOn });
    this.isManual = true;
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
