import React, { Component } from 'react'
import { initControl } from './control'

export default class ik extends Component {
  componentDidMount() {
    initControl(document.getElementById('ik__canvas'));
  }

  render() {
    return (
      <div className="preview__content preview--ik">
        <canvas
          className="content__canvas"
          id="ik__canvas"
          height="200"
          width="200" />
        <p className="content__caption">Click para desanclar y arrastar.</p>
      </div>
    )
  }
}
