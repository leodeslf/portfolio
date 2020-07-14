import React, { Component } from 'react'

export default class ColorSchemeSwitch extends Component {
  constructor() {
    super();
    this.state = {
      isDark: localStorage.getItem('colorScheme') === 'dark'
    }
  }

  componentDidMount() {
    if (this.state.isDark) document.body.classList.add('dark');
  }

  resetScheme(e) {
    const checked = e.target.checked;
    if (checked) {
      document.body.classList.add('dark');
      localStorage.setItem('colorScheme', 'dark');
    }
    else {
      document.body.classList.remove('dark');
      localStorage.removeItem('colorScheme');
    }
    this.setState({ isDark: checked });
  }

  render() {
    return (
      <span className="color-scheme-switch">
        <input
          className="color-scheme-switch__input"
          id="css" type="checkbox"
          defaultChecked={this.state.isDark}
          onChange={e => this.resetScheme(e)} />
        <label
          className="color-scheme-switch__label"
          htmlFor="css" title="Switch color scheme">
        </label>
      </span>
    );
  }
}

/**
 * Vanilla implementation github.com/coliff/dark-mode-switch
 * Additional info css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/
 */
