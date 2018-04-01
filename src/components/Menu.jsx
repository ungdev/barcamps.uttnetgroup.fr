import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormGroup, ControlLabel, FormControl, Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap'

import { filter, apply } from '../actions'
import '../styles/App.css'

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      barcamps: [],
      speakers: []
    }
  }

  handleChange(type,event) {
    var p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,event.target.value)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))})
  }

  fieldSelection(type,name) {
    return(
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>{name}</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value="select"> </option>
          {type}
        </FormControl>
      </FormGroup>
    );
  }

  render() {
    var barcamps = this.props.barcamps
      ? this.props.barcamps.map(b => {
          var event = new Date(b.date);
          return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
        })
      : []
    var speakers = this.props.speakers
      ? this.props.speakers.map(s => {
          return  <option key={s.id} value={s.id}>Par {s.firstname} {s.lastname}</option>
        })
      : []
    var talks = this.props.talks
      ? this.props.talks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)
      : []

    return(
      <div className='Navbar'>
        <h1 className='Navbar'> BARCAMPS
        <Button className='Login'>
          <Glyphicon glyph="user" />
        </Button>
        </h1>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} sm={4}>
              {this.fieldSelection(barcamps,'Barcamps:')}
            </Col>
            <Col xs={6} sm={4}>
              {this.fieldSelection(speakers,'Speakers:')}
            </Col>
            <Col xs={6} sm={4}>
              {this.fieldSelection(talks,'Présentations:')}
            </Col>
          </Row>
        </Grid>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    talks: state.data.talks,
    filter: state.filter.filter,
    barcamps: state.data.barcamps,
    speakers: state.data.speakers
  };
}

export default connect(mapStateToProps)(Menu);
