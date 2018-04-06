import React, { Component } from 'react';

import SpeakerService from '../services/SpeakerService'
import '../styles/Talk.css';



class SpeakerInfo extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      listTalks: [<li></li>,<li></li>]
    }
  }

  componentDidMount() {
    SpeakerService.getID(this.props.speaker.id)
    .then(speaker => {
      this.setState({email : speaker.email});
      let listTalks = speaker.talks.map(talk => <li>{talk.title}</li>);
      this.setState({listTalks})
    });
  }

  render() {

    return(
      <div>
        Email: {this.state.email} <br/>
        Liste des présentations:
        <ul>{this.state.listTalks}</ul>
      </div>
    )
  }

}
export default SpeakerInfo;
