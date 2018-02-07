import React, { Component } from 'react';
import { connect } from 'react-redux';

import OauthService from '../services/OauthService'
import { addJWT } from '../actions'

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
    var codes = window.location.search.split(/=|&/);
    var authorization_code = codes[1];
    if (authorization_code !== undefined) {
      var form = new FormData();
      form.append("authorization_code", authorization_code);
      fetch("https://api.barcamps.uttnetgroup.fr/api/oauth/token/", {method: 'post', body: form })
        .then(response => response.json())
        .then(response => this.props.dispatch(addJWT(response)));
    }
  }

  handleClick() {
    console.log(window.location.href);
  }

  render() {
    return (<a className='Clickable' href= {this.state.oauth}> Accèes Admin </a>);
  }
}

function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(Admin);
