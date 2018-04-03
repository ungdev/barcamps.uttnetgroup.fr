import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  Row,
  Col,
  Glyphicon,
  Button,
  Dropdown,
  MenuItem} from 'react-bootstrap'

import OauthService from '../services/OauthService'
import { filter, apply, addUser, create } from '../actions'
import '../styles/App.css'

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      oauth: "",
      barcamps: [],
      speakers: []
    }
  }

  componentDidMount() {
    OauthService.get()
      .then(oauth => {this.setState({oauth});return oauth})
    let codes = window.location.search.split(/=|&/);
    let authorization_code = codes[1];
    if (authorization_code !== undefined) {
      let form = new FormData();
      form.append("authorization_code", authorization_code);
      fetch("https://api.barcamps.uttnetgroup.fr/api/oauth/token/", {method: 'POST', body: form })
        .then(response => response.json())
        .then(response => this.props.dispatch(addUser(response)));
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

  getMenu() {
    if (this.props.admin.exist) {
      return (
       <Dropdown.Menu>
          <MenuItem eventKey="1" onClick={() => {this.props.dispatch(create("talk"))}}>Ajouter Présentation</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.props.dispatch(create("barcamp"))}}>Ajouter Barcamp</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.props.dispatch(create("speaker"))}}>
            Ajouter Speaker
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Deconnexion</MenuItem>
       </Dropdown.Menu>
      )
    } else {
      return (
         <Dropdown.Menu>
        <MenuItem eventKey="1" href= {this.state.oauth}>Connexion</MenuItem>
         </Dropdown.Menu>
      )
    }
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
        <h1 className='Navbar'> B A R C A M P S
          <Dropdown className="Login" pullRight>
           <Dropdown.Toggle>
             <Glyphicon glyph="user" />
           </Dropdown.Toggle>
             {this.getMenu()}
         </Dropdown>
        </h1>
        <Grid fluid className='Selection'>
          <Row>
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
    speakers: state.data.speakers,
    admin: state.admin
  };
}

export default connect(mapStateToProps)(Menu);
