import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Button, ButtonGroup,Modal } from 'react-bootstrap'

import CreateForm from './CreateForm.jsx';
import DisplayTalks from './DisplayTalks.jsx'
import { fetchTalks, deleteBarcamp } from '../actions/index'
import BarcampService from '../services/BarcampService'
import '../styles/App.css'
class DisplayBarcamps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.delete = this.delete.bind(this);
  }

  showBarcamps(barcamps) {
      return barcamps.map((barcamp) =>{
        const date = new Date(barcamp.date)
        return (<div><h2 className='Barcamp'>{barcamp.title} le {date.toLocaleDateString()} {this.edit(barcamp)}</h2>
        <hr width="78%" color="grey"/>
        <DisplayTalks talks = {barcamp.talks}/></div>)
      });
  }

  edit(barcamp) {
    if (this.props.admin.user.admin) {//true
      return (
        <div className="editButton">
        <ButtonGroup>
          <Button bsSize="small">
            <Glyphicon glyph="pencil"/>
          </Button>
          <Button bsSize="small" onClick={() => this.handleShow(barcamp)}>
            <Glyphicon glyph="trash"/>
          </Button>
        </ButtonGroup>
        </div>
      )
    } else {
      return null
    }
  }

  handleShow(barcamp) {
    this.setState({show : true, barcamp})
  }

  delete() {
    this.setState({show : false});
    BarcampService.deleteID(this.props.admin.token,this.state.barcamp.id);
    this.props.dispatch(deleteBarcamp(this.state.barcamp.id));
    this.props.dispatch(fetchTalks());
  }

  render() {
    let barcamps = this.props.barcamps ? this.showBarcamps(this.props.barcamps)
    : [];

    return (
        <div>
          <CreateForm />
          {barcamps}
          <Modal show={this.state.show} onHide={() => this.setState({show: false})}>
            <Modal.Header closeButton>
              Confirmer la suppression du barcamp
            </Modal.Header>
            <Modal.Body>
              <Button bsStyle="danger" onClick={this.delete}>Supprimer</Button>
            </Modal.Body>
          </Modal>
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
