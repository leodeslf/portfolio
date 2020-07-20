import React, { Component } from 'react'

export default class DarkMode extends Component {
  constructor() {
    super();
    this.state = {
      // Get current state of color scheme
      isDark: localStorage.getItem('colorScheme') === 'dark'
    }
  }

  componentDidMount() {
    // Sets current state of color scheme (if it exists)
    if (this.state.isDark) document.body.classList.add('dark');
  }

  resetScheme(e) {
    // True = dark mode active
    const checked = e.target.checked;
    if (checked) {
      /**
       * If used:
       * - Add class for CSS
       * - Save local config
       */
      document.body.classList.add('dark');
      localStorage.setItem('colorScheme', 'dark');
    }
    else {
      /**
       * If not:
       * - Remove class for CSS
       * - Delete local config
       */
      document.body.classList.remove('dark');
      localStorage.removeItem('colorScheme');
    }
    // Finally update state
    this.setState({ isDark: checked });
  }

  render() {
    return (
      <span className="dark-mode">
        <input
          id="mode"
          className="dark-mode__input"
          type="checkbox"
          defaultChecked={this.state.isDark}
          onChange={e => this.resetScheme(e)} />
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
