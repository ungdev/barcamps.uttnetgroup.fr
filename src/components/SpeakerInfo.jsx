import React, { Component } from 'react';

import '../styles/Talk.css';



class SpeakerInfo extends Component {

  render() {

    return(
      <div>
        {this.props.speaker.email}
      </div>
    )
  }

}
export default SpeakerInfo;
