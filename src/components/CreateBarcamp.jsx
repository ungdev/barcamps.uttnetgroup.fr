import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Col, FormControl, ControlLabel, Button} from 'react-bootstrap'

import { create } from '../actions'
import BarcampService from '../services/BarcampService.js';
import '../styles/Talk.css';

const initialState = {
  title: '',
  description: '',
  date:''
};

class CreateBarcamp extends Component {

  componentWillMount(){
    this.setState(initialState);
  }

  handleClick(event){
    let content = {};
    let date = new Date(this.state.date)
    date = date.toISOString()
    content = {
      title: this.state.title,
      description: this.state.description,
      date: date
      };
    BarcampService.post(this.props.token,content);
    this.setState(initialState);
    this.props.dispatch(create(""))
  }

  handleChange(type,event){
    this.setState({[type]: event.target.value})
  }

  render() {
    return(
      <div>
        <h1 className='Title'>Création barcamp:</h1>
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
              Date
            </Col>
            <Col sm={8}>
              <FormControl type="date" value={this.state.date} onChange={this.handleChange.bind(this,'date')} placeholder="Date" />
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

export default connect(mapStateToProps)(CreateBarcamp);
