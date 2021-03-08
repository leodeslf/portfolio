import React, { Component } from 'react';
import { getDataForTW } from './control';

export default class tw extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true
    }
  }

  componentDidMount() {
    getDataForTW().then(res => {
      if (res) {
        this.setState({
          data: res,
          loading: false
        });
      }
    });
  }

  render() {
    const { name, countryCode, temp, tempMin, tempMax } = this.state.data;
    return (
      <div className="preview__main preview--tw">
        {this.state.loading && <p>Cargando...</p>}
        {!this.state.loading &&
          <div
            id="tw__card"
            className="preview__body">
            <div className="card__header">
              <span className="card__name"><em>{`${name}, ${countryCode}`}</em></span>
              <div className="card__flag">
                <img
                  src={'https://www.countryflags.io/' + countryCode + '/shiny/16.png'}
                  alt="Bandera nacional"
                  title="Bandera nacional"
                  width="16"
                  height="16" />
              </div>
            </div>
            <hr />
            <div className="card__temp">
              <p className="temp__current">{temp}°</p>
              <p className="temp__max"><span>Máx</span>{tempMax}°</p>
              <p className="temp__min"><span>Mín</span>{tempMin}°</p>
            </div>
          </div>}
      </div>
    )
  }
}
