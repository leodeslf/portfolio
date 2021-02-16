import React, { Component } from 'react';
import { fetchData } from './control';

export default class tw2 extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: { name: '', text: '', temp: '', icon: '' }
    }
  }

  componentDidMount() {
    fetchData().then(res => {
      this.setState({
        data: res,
        loading: false
      });
    });
  }

  render() {
    const { temp, name, text } = this.state.data;
    return (
      <div className="preview--tw2 preview__content">
        {this.state.loading && <p>Cargando...</p>}
        {!this.state.loading &&
          <div id="tw2__card">
            <div className="card__content">
              <span className="card__temp">{temp}°</span>
              <span className="card__name">{name}</span>
              <span className="card__text">{text}</span>
            </div>
          </div>}
      </div>
    );
  }
}
