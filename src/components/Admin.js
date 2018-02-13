import React, { Component } from 'react';
import { connect } from 'react-redux';

import OauthService from '../services/OauthService'
import { addUser } from '../actions'
import Create from './Create'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oauth: ""
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

  render() {
    let admin = <div></div>
    if (this.props.admin.exist) {
      admin = <div><a> Connecté en tant que {this.props.admin.user.firstName} {this.props.admin.user.lastName} </a>
        <Create /> </div>
    } else {
      admin = <a className='Clickable' href= {this.state.oauth}> Connexion </a>
    }
    return (<div>{admin}</div>);
  }
}

function mapStateToProps(state) {
  return {
    admin: state.admin
  };
}
export default connect(mapStateToProps)(Admin);