import React, { Component } from 'react';
import { connect } from 'react-redux';

import { create } from '../actions'

class Create extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
      <p> <a className='Clickable' onClick={() => {this.props.dispatch(create("barcamp"))}}> Ajouter un barcamp </a></p>
      <p> <a className='Clickable' onClick={() => {this.props.dispatch(create("talk"))}}> Ajouter une présentation </a> </p>
      <p> <a className='Clickable' onClick={() => {this.props.dispatch(create("speaker"))}}> Ajouter un speaker </a> </p></div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Create);
