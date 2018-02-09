import React, { Component } from 'react';
import { connect } from 'react-redux';

import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
import TalkService from '../services/TalkService.js';

const initialState = {
  title: '',
  description: '',
  slides: null,
  date:'',
  barcamp_id: '',
  speaker_id: '',
  firstName: '',
  lastName: '',
  email: '',
};

class CreateForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps){
    this.setState(initialState);
  }

  handleClick(type,event){
    let content = {};
    switch (type) {
      case "barcamp":
        let date = new Date(this.state.date)
        date = date.toISOString()
        content = {
          title: this.state.title,
          description: this.state.description,
          date: date};
        BarcampService.post(this.props.token,content);
        break;
      case "talk":
        content = {
          title: this.state.title,
          description: this.state.description,
          barcamp_id: this.state.barcamp_id,
          speaker_id: this.state.speaker_id,
          slides: this.state.slides
        };
        TalkService.post(this.props.token,content);
        break;
      case "speaker":
        content = {
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          email: this.state.email};
        SpeakerService.post(this.props.token,content);
        break;
      default:
    }
    this.setState(initialState)
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  handleChangeID(type, event){
    switch (type) {
      case "speaker":
        this.setState({speaker_id: event.target.value})
        break;
      case "barcamp":
        this.setState({barcamp_id: event.target.value})
        break;
      default:

    }
  }

  handleFile(event){
    this.setState({slides: event.target.files[0]})
  }

  getListSpeakers() {
    let speakers = this.props.speakers.map(s => {
      return  <option key={s.id} value={s.id}>Par {s.firstname} {s.lastname}</option>
    });
    return(<select value={this.state.speaker_id} onChange={this.handleChangeID.bind(this,"speaker")}>
      <option value=""> </option>
      {speakers}
    </select>)
  }

  getListBarcamps() {
    let barcamps = this.props.barcamps.map(b => {
      let event = new Date(b.date);
      return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
    });
    return (<select value={this.state.barcamp_id} onChange={this.handleChangeID.bind(this,"barcamp")}>
      <option value=""> </option>
      {barcamps}
    </select>)
  }

  render() {
    let form = '';
    switch (this.props.create) {
      case "barcamp":
        form = <div>
          <p>Création barcamp:</p>
          <br/>
          Titre: <input type='form' value={this.state.title} onChange={this.handleChange.bind(this,'title')} />
          <br/>
          Description: <input type='form' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
          <br/>
          Date: <input type='date' value={this.state.date} onChange={this.handleChange.bind(this,'date')} />
          <br/>
          <button type='button' onClick={this.handleClick.bind(this,"barcamp")}>Ajouter</button>
        </div>
        break;
      case "talk":
        form = <div>
          <p>Création présentation:</p>
          <br/>
          Titre: <input type='form' value={this.state.title} onChange={this.handleChange.bind(this,'title')} />
          <br/>
          Description: <input type='form' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
          <br/>
          Barcamp: {this.getListBarcamps()}
          <br/>
          Speaker: {this.getListSpeakers()}
          <br/>
          <input type='file' onChange={this.handleFile.bind(this)}/>
          <br/>
          <button type='button' onClick={this.handleClick.bind(this,"talk")}>Ajouter</button>
        </div>
        break;
      case "speaker":
      form = <div>
          <p>Création speaker:</p>
          <br/>
          Prénom: <input type='form' value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} />
          <br/>
          Nom: <input type='form' value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} />
          <br/>
          Email: <input type='form' value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
          <br/>
          <button type='button' onClick={this.handleClick.bind(this,"speaker")}>Ajouter</button>
        </div>
        break;
      default:
        return form
    }
    return(
      <div>
        {form}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    create: state.create.create,
    token: state.admin.token,
    barcamps: state.data.barcamps,
    speakers: state.data.speakers
  };
}

export default connect(mapStateToProps)(CreateForm);
