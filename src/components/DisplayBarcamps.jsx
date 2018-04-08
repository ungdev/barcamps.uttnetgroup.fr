import React, { Component } from 'react'
import { connect } from 'react-redux'

import Talk from './Talk.jsx';
import CreateForm from './CreateForm.jsx';
import EditTalk from './EditTalk.jsx';
import EditBarcamp from './EditBarcamp.jsx'
import EditSpeaker from './EditSpeaker.jsx'
import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
import DisplayTalks from './DisplayTalks.jsx'
//import { fetchTalks } from '../actions/index'
import '../styles/App.css'

class DisplayBarcamps extends Component {

  showBarcamps() {
    console.log('tubzgirezjgbifdsvncgd');
      return this.props.barcamps.map((barcamp) => {
        <div><h2>{barcamp.title}</h2>
        <DisplayTalks talks = {barcamp.talks}/></div>

      })
  }

  render() {
    let barcamps = this.props.barcamps ? this.showBarcamps()
    : [];

    return (
        <div>
          issous
          {this.showBarcamps()}
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    filter: state.filter.filter,
    barcamps: state.data.barcamps,
    admin: state.admin
  };
}

export default connect(mapStateToProps)(DisplayBarcamps);
