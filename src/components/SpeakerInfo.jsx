import React, { Component } from 'react';
import '../styles/Talk.css';

class SpeakerInfo extends Component {

  render() {

    const listTalks = this.props.speaker.talks.map(talk => <li>{talk.title}</li>);

    return(
      <div>
        Email: {this.props.speaker.email} <br/>
        Liste des présentations:
          <ul>{listTalks}</ul>
      </div>
    )
  }
}

export default SpeakerInfo;
