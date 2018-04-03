import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'

import { create } from '../actions';
import SpeakerService from '../services/SpeakerService.js';
import '../styles/Talk.css';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
};

class CreateSpeaker extends Component {

  componentWillMount(){
    this.setState(initialState);
  }

  handleClick(event){
    let content = {};
    content = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      email: this.state.email};
    SpeakerService.post(this.props.token,content);
    this.setState(initialState);
    this.props.dispatch(create(""))
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  render() {
    return(
      <div>
        <h1 className='Title'>Création speaker:</h1>
        <br/>
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Prénom
            </Col>
            <Col sm={8}>
              <FormControl type="text" value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} placeholder="Prénom" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Nom
            </Col>
            <Col sm={8}>
              <FormControl type="text" value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} placeholder="Nom" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={8}>
              <FormControl type="email" value={this.state.email} onChange={this.handleChange.bind(this,'email')} placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Ajouter</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.admin.token
  };
}

export default connect(mapStateToProps)(CreateSpeaker);
