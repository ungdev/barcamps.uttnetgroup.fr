import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'

import { addTalk, create } from '../actions'
import TalkService from '../services/TalkService.js';
import '../styles/Talk.css';

const initialState = {
  title: '',
  description: '',
  slides: null,
  barcamp_id: '',
  speaker_id: ''
};

class CreateTalk extends Component {

  componentWillMount(){
    this.setState(initialState);
  }

  handleClick(event){
    let content = {};
    content = {
      title: this.state.title,
      description: this.state.description,
      barcamp_id: this.state.barcamp_id,
      speaker_id: this.state.speaker_id,
      slides: this.state.slides
    };
    TalkService.post(this.props.token,content);
    content = {...content, id: this.props.lastTalk.id+1}
    this.props.dispatch(addTalk(content))
    this.props.dispatch(create(""))
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
    return(
      <div>
        <h1 className='Title'>Création présentation:</h1>
        <br/>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Titre
            </Col>
            <Col sm={8}>
              <FormControl type="text" value={this.state.title} onChange={this.handleChange.bind(this,'title')} placeholder="Titre" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
            <Col sm={8}>
              <FormControl type="text" value={this.state.description} onChange={this.handleChange.bind(this,'description')} placeholder="Description" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Barcamp
            </Col>
            <Col sm={8}>
              <FormControl componentClass="select" placeholder="select"/>
              {this.getListBarcamps()}
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Ajouter</Button>
            </Col>
          </FormGroup>
        </Form>
        Titre: <input type='text' value={this.state.title} onChange={this.handleChange.bind(this,'title')} />
        <br/>
        Description: <input type='text' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
        <br/>
        Barcamp: {this.getListBarcamps()}
        <br/>
        Speaker: {this.getListSpeakers()}
        <br/>
        <input type='file' onChange={this.handleFile.bind(this)}/>
        <br/>
        <button type='button' onClick={this.handleClick.bind(this,"talk")}>Ajouter</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.admin.token,
    barcamps: state.data.barcamps,
    speakers: state.data.speakers,
    lastTalk: state.data.talks[state.data.talks.length-1]
  };
}

export default connect(mapStateToProps)(CreateTalk);
