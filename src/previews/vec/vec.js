import React, { Component } from 'react'
import { initControl, reset } from './control'

export default class vec extends Component {
  componentDidMount() {
    initControl(
      document.getElementById('vec__canvas'),
      document.getElementById('vec__debug-canvas')
    );
  }

  render() {
    return (
      <div className="preview__main preview--vec">
        <canvas
          className="preview__body"
          id="vec__canvas"
          height="200"
          width="200"
          onClick={reset} />
        <canvas
          id="vec__debug-canvas"
          height="200"
          width="200" />
        <p className="preview__caption">Click para iniciar nuevo patrón.</p>
      </div>
    )
  }
}
