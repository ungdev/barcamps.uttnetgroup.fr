import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Glyphicon, Button, ButtonGroup,Modal, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap'

import CreateForm from './CreateForm.jsx';
import DisplayTalks from './DisplayTalks.jsx'
import { fetchTalks, deleteBarcamp, updateBarcamp } from '../actions/index'
import BarcampService from '../services/BarcampService'
import '../styles/App.css'
class DisplayBarcamps extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showD: false,
      showE: false,
      barcamp : {
        title: null,
        date: null,
        description:null
      }
    };
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  showBarcamps(barcamps) {
      return barcamps.map((barcamp) =>{
        const date = new Date(barcamp.date)
        return (<div><h2 className='Barcamp'>{barcamp.title} le {date.toLocaleDateString()} {this.buttons(barcamp)}</h2>
        <hr width="78%" color="grey"/>
        <DisplayTalks talks = {barcamp.talks}/></div>)
      });
  }

  buttons(barcamp) {
    if (this.props.admin.user.admin) {//true
      return (
        <div className="editButton">
        <ButtonGroup>
          <Button bsSize="small" onClick={()=>this.handleShow(barcamp,"edit")}>
            <Glyphicon glyph="pencil"/>
          </Button>
          <Button bsSize="small" onClick={()=>this.handleShow(barcamp,"delete")}>
            <Glyphicon glyph="trash"/>
          </Button>
        </ButtonGroup>
        </div>
      )
    } else {
      return null
    }
  }

  handleShow(barcamp,type) {
    if (type === "delete") {
      this.setState({showD : true, barcamp})
    } else if(type === "edit"){
      barcamp.date = barcamp.date.slice(0,10);
      this.setState({showE : true, barcamp});
    }
  }

  handleChange(type,event){
      let barcamp = this.state.barcamp;
      barcamp[type] = event.target.value;
      this.setState({barcamp});
  }

  delete() {
    this.setState({showD : false});
    BarcampService.deleteID(this.props.admin.token,this.state.barcamp.id);
    this.props.dispatch(deleteBarcamp(this.state.barcamp.id));
    this.props.dispatch(fetchTalks());
  }

  edit(){
    this.setState({showE : false});
    let date = new Date(this.state.barcamp.date)
    date = date.toISOString()
    let content = {
      title: this.state.barcamp.title,
      description: this.state.barcamp.description,
      date
    };
    BarcampService.putID(this.props.admin.token,this.state.barcamp.id,content);
    content = {...content, id: this.state.barcamp.id};
    this.props.dispatch(updateBarcamp(content));
  }

  render() {
    let barcamps = this.props.barcamps ? this.showBarcamps(this.props.barcamps)
    : [];

    return (
        <div>
          <CreateForm />
          {barcamps}
          <Modal show={this.state.showD} onHide={() => this.setState({showD: false})}>
            <Modal.Header closeButton>
              Confirmer la suppression du barcamp
            </Modal.Header>
            <Modal.Body>
              <Button bsStyle="danger" onClick={this.delete}>Supprimer</Button>
            </Modal.Body>
          </Modal>
          <Modal show={this.state.showE} onHide={() => this.setState({showE: false})}>
            <Modal.Header closeButton>
              Editer barcamp
            </Modal.Header>
            <Modal.Body>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Titre
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" value={this.state.barcamp.title} onChange={(e) => this.handleChange('title',e)} placeholder="Titre" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Description
                  </Col>
                  <Col sm={8}>
                    <FormControl type="text" value={this.state.barcamp.description} onChange={(e) => this.handleChange('description',e)} placeholder="Description" />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Date
                  </Col>
                  <Col sm={8}>
                    <FormControl type="date" value={this.state.barcamp.date} onChange={(e) => this.handleChange('date',e)} placeholder="Date" />
                  </Col>
                </FormGroup>
              </Form>
              <Button bsStyle="primary" onClick={this.edit}>Modifier</Button>
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
