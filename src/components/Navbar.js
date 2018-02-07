import React, { Component } from 'react';
import { connect } from 'react-redux';

import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
import { filter, apply } from '../actions'

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      barcamps: [],
      speakers: []
    }
  }

  handleChange(type,event) {
    var p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,event.target.value)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))})
  }

  componentDidMount() {
    BarcampService.get()
      .then(barcamps => this.setState({barcamps}));
    SpeakerService.get()
      .then(speakers => this.setState({speakers}));
  }

  render() {
    var barcamps = this.state.barcamps.map(b => {
      var event = new Date(b.date);
      return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
    });
    var speakers = this.state.speakers.map(s => {
      return  <option key={s.id} value={s.id}>Par {s.firstname} {s.lastname}</option>
    });
    var talks ="";
    if (this.props.talks !== undefined) {
      if (this.props.talks.length != 0 ){
        talks = this.props.talks.map(t => <option key={t.id} value={t.id}>{t.title}</option>);
      }
    }
    return(
      <div>
        <div className='Header'>
          <h1 key="bar"> BARCAMPS </h1>
          <p> Les présentations </p>
        </div>
        <div className='Categories'>
          <label>
            Barcamp :
            <select value={this.props.filter[0]} onChange={this.handleChange.bind(this,"barcamp")}>
              <option value=""> </option>
              {barcamps}
            </select>
          </label>
          <br/>
          <br/>
          <label>
            Speaker :
            <select value={this.props.filter[1]} onChange={this.handleChange.bind(this,"speaker")}>
              <option value=""> </option>
              {speakers}
            </select>
          </label>
          <br/>
          <br/>
          <label>
            Présentation :
            <select value={this.props.filter[2]} onChange={this.handleChange.bind(this,"talk")}>
              <option value=""> </option>
              {talks}
            </select>
          </label>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    talks: state.talks.talks,
    filter: state.filter.filter
  };
}

export default connect(mapStateToProps)(Navbar);
