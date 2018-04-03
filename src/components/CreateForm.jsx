import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateTalk from './CreateTalk.jsx'
import CreateBarcamp from './CreateBarcamp.jsx'
import CreateSpeaker from './CreateSpeaker.jsx'
import '../styles/Talk.css'

class CreateForm extends Component {

  render() {
    let form = '';
    switch (this.props.create) {
      case "barcamp":
        form = <CreateBarcamp />
        break;
      case "talk":
        form = <CreateTalk />
        break;
      case "speaker":
      form = <CreateSpeaker />
        break;
      default:
        return form
    }
    return(
      <div className='CreateForm'>
        {form}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    create: state.create.create
  };
}

export default connect(mapStateToProps)(CreateForm);
