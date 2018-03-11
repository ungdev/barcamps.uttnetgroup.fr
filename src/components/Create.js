import React, { Component } from 'react';
import { connect } from 'react-redux';

import { create } from '../actions'
import '../styles/App.css';

class Create extends Component {
  render() {
    return(
      <ul>
        <li> <a className='Clickable' onClick={() => {this.props.dispatch(create("barcamp"))}}> Ajouter un barcamp </a></li>
        <li> <a className='Clickable' onClick={() => {this.props.dispatch(create("talk"))}}> Ajouter une présentation </a> </li>
        <li> <a className='Clickable' onClick={() => {this.props.dispatch(create("speaker"))}}> Ajouter un speaker </a> </li>
      </ul>
    )
  }
}


function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(Create);
