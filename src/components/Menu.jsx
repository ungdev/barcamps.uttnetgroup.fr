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
  Dropdown,
  MenuItem,
  Navbar} from 'react-bootstrap'

import OauthService from '../services/OauthService'
import { filter, apply, addUser, create, fetchBarcamps } from '../actions'
import '../styles/App.css'

class Menu extends Component {

  constructor() {
    super();
    this.state = {
      oauth: "",
      barcamps: [],
      speakers: []
    };
    this.handleChange = this.handleChange.bind(this);
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

  test(){
    console.log('clic');
  }

  handleChange(type,value) {
    if (value !== "") {
      let p1 = new Promise((resolve,reject) => {
        resolve(this.props.dispatch(filter(type,value)))});
      p1.then(() => {
        this.props.dispatch(apply(this.props.filter,type))})
    } else {
      this.props.dispatch(fetchBarcamps())
    }
  }

  fieldSelection(type,name,varN) {
    return(
      <FormGroup controlId="formControlsSelect">
        <ControlLabel>{name}</ControlLabel>
        <FormControl componentClass="select" placeholder="select" onClick={(e) => this.handleChange(varN,e.target.value)}>
          <option value=""> </option>
          {type}
        </FormControl>
      </FormGroup>
    );
  }

  getMenu() {
    if (this.props.admin.user.admin) { // for testing replace with true
      return (
       <Dropdown.Menu>
          <MenuItem eventKey="1" onClick={() => {this.props.dispatch(create("talk"))}}>Ajouter Présentation</MenuItem>
          <MenuItem eventKey="2" onClick={() => {this.props.dispatch(create("barcamp"))}}>Ajouter Barcamp</MenuItem>
          <MenuItem eventKey="3" onClick={() => {this.props.dispatch(create("speaker"))}}>
            Ajouter Speaker
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4" href="https://barcamps.uttnetgroup.fr">Deconnexion</MenuItem>
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
      <div>
        <Navbar fixedTop = 'true' fluid='true' className="MenuBack">
          <h1 className='Navbar'> B A R C A M P S
            <Dropdown className="Login" pullRight>
             <Dropdown.Toggle>
               <Glyphicon glyph="user" />
             </Dropdown.Toggle>
               {this.getMenu()}
           </Dropdown>
          </h1>
        </Navbar>
        <Grid fluid className='Selection'>
          <Row>
            <Col xs={6} sm={4}>
              {this.fieldSelection(barcamps,'Barcamps:','barcamp')}
            </Col>
            <Col xs={6} sm={4}>
              {this.fieldSelection(speakers,'Speakers:','speaker')}
            </Col>
            <Col xs={6} sm={4}>
              {this.fieldSelection(talks,'Présentations:','talk')}
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
