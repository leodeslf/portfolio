import React, { Component } from 'react';
import { fetchData } from './control';

export default class tw extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true
    }
  }

  componentDidMount() {
    fetchData().then(res => {
      this.setState({
        data: res,
        loading: false
      })
    })
  }

  render() {
    const { name, countryCode, temp, tempMin, tempMax } = this.state.data;
    return (
      <div className="preview--tw preview-content">
        {this.state.loading && <p>Cargando...</p>}
        {!this.state.loading &&
          <div id="tw__card">
            <div className="card__header">
              <span className="card__name"><em>{`${name}, ${countryCode}`}</em></span>
              <div className="card__flag">
                <img
                  src={'https://www.countryflags.io/' + countryCode + '/shiny/16.png'}
                  alt="Bandera nacional"
                  title="Bandera nacional" />
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
