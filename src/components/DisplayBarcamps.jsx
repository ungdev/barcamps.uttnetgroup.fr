import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Button, ButtonGroup } from 'react-bootstrap'

import CreateForm from './CreateForm.jsx';
import DisplayTalks from './DisplayTalks.jsx'
//import { fetchTalks } from '../actions/index'
import '../styles/App.css'
class DisplayBarcamps extends Component {

  showBarcamps(barcamps) {
      return barcamps.map((barcamp) =>{
        const date = new Date(barcamp.date)
        return (<div><h2 className='Barcamp'>{barcamp.title} le {date.toLocaleDateString()} {this.edit()}</h2>
        <hr width="78%" color="grey"/>
        <DisplayTalks talks = {barcamp.talks}/></div>)
      });
  }

  edit() {
    if (this.props.admin.user.admin) {//true) {
      return (
        <div className="editButton">
        <ButtonGroup>
          <Button bsSize="small">
            <Glyphicon glyph="pencil"/>
          </Button>
          <Button bsSize="small">
            <Glyphicon glyph="trash"/>
          </Button>
        </ButtonGroup>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    let barcamps = this.props.barcamps ? this.showBarcamps(this.props.barcamps)
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
