import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    this.setState(initialState)
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  render() {
    return(
      <div className='Talk'>
        <p>Création speaker:</p>
        <br/>
        Prénom: <input type='text' value={this.state.firstName} onChange={this.handleChange.bind(this,'firstName')} />
        <br/>
        Nom: <input type='text' value={this.state.lastName} onChange={this.handleChange.bind(this,'lastName')} />
        <br/>
        Email: <input type='text' value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
        <br/>
        <button type='button' onClick={this.handleClick.bind(this)}>Ajouter</button>
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
