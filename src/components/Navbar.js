import React, { Component } from 'react';
import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      talkID: "",
      barcampID: "",
      speakerID: "",
      barcamps: [],
      speakers: [],
      talks: []
    }
  }

  handleChange(type,event) {
    switch (type) {
      case 'bar':
        this.setState({barcampID: event.target.value});
        break;
      case 'talk':
        this.setState({talkID: event.target.value});
        break;
      case 'speaker':
        this.setState({speakerID: event.target.value});
        break;
      default:
    }
  }

  handleClick(event) {
    const filter = [this.state.barcampID,this.state.speakerID,this.state.talkID]
    this.props.updateFilter(filter)
  }

  componentDidMount() {
    BarcampService.get()
      .then(barcamps => this.setState({barcamps}));
    SpeakerService.get()
      .then(speakers => this.setState({speakers}));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({barcampID: nextProps.filter[0]});
    this.setState({speakerID: nextProps.filter[1]});
    this.setState({talkID: nextProps.filter[2]})
    this.setState({talks: nextProps.talks})
  }

  render() {
    var barcamps = this.state.barcamps.map(b => {
      var event = new Date(b.date);
      return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
    });
    var speakers = this.state.speakers.map(s => {
      return  <option key={s.id} value={s.id}>Par {s.firstname} {s.lastname}</option>
    });
    var talks = this.state.talks.map(t => {
      return  <option key={t.id} value={t.id}>{t.title}</option>
    });
    return(
      <div>
        <div className='Header'>
          <h1 key="bar"> BARCAMPS </h1>
          <p> Les présentations </p>
        </div>
        <div className='Categories'>
          <label>
            Barcamp :
            <select value={this.state.barcampID} onChange={this.handleChange.bind(this,"bar")}>
              <option value=""> </option>
              {barcamps}
            </select>
          </label>
          <br/>
          <br/>
          <label>
            Speaker :
            <select value={this.state.speakerID} onChange={this.handleChange.bind(this,"speaker")}>
              <option value=""> </option>
              {speakers}
            </select>
          </label>
          <br/>
          <br/>
          <label>
            Présentation :
            <select value={this.state.talkID} onChange={this.handleChange.bind(this,"talk")}>
              <option value=""> </option>
              {talks}
            </select>
          </label>
          <br/>
          <br/>
          <button onClick={this.handleClick.bind(this)}>
            Filtrer
          </button>
        </div>
      </div>
    );
  }
}

export default Navbar
