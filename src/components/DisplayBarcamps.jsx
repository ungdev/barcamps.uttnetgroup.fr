import React, { Component } from 'react'
import { connect } from 'react-redux'

import CreateForm from './CreateForm.jsx';
import DisplayTalks from './DisplayTalks.jsx'
//import { fetchTalks } from '../actions/index'
import '../styles/App.css'
class DisplayBarcamps extends Component {

  constructor(){
    super();
    this.state = {
      barcamps: 'ISSOU'
    }
  }

  showBarcamps() {
      return this.props.barcamps.map((barcamp) =>
        <div><h2 className='Barcamp'>{barcamp.title}</h2>
        <hr width="78%" color="grey"/>
        <DisplayTalks talks = {barcamp.talks}/></div>
      );
  }

  render() {
    let barcamps = this.props.barcamps ? this.showBarcamps()
    : [];

    return (
        <div>
          <CreateForm />
          {barcamps}
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
