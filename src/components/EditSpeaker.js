import React, { Component } from 'react';
import { connect } from 'react-redux';

import SpeakerService from '../services/SpeakerService'
import { deleteSpeaker, updateSpeaker, fetchTalks } from '../actions'
import '../styles/Talk.css';

class EditSpeaker extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  updateState(speaker) {
    this.setState(speaker);
  }

  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.speaker);
  }

  handleClick(event){
    let content = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email
    };
    SpeakerService.putID(this.props.token,this.state.id,content);
    content = {...content, id: this.state.id};
    this.props.dispatch(updateSpeaker(content))
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  handleDelete(event) {
    SpeakerService.deleteID(this.props.token,this.state.id);
    this.props.dispatch(deleteSpeaker(this.state.id));
    this.props.dispatch(fetchTalks());

  }

  render() {
    return(<div className='Talk'>
        Prénom: <input type='text' value={this.state.firstname} onChange={this.handleChange.bind(this,'firstname')} />
        <br/>
        Nom: <input type='text' value={this.state.lastname} onChange={this.handleChange.bind(this,'lastname')} />
        <br/>
        Email: <input type='text' value={this.state.email} onChange={this.handleChange.bind(this,'email')} />
        <br/>
        <button type='button' onClick={this.handleClick.bind(this)}>Modifier</button>
        <button type ='button' onClick={this.handleDelete.bind(this)}>Supprimer</button>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    token: state.admin.token
  };
}

export default connect(mapStateToProps)(EditSpeaker);
