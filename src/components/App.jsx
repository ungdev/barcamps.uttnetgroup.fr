import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTalks, fetchBarcamps, fetchSpeakers, getUser } from '../actions';
import Menu from './Menu.jsx';
import DisplayBarcamps from './DisplayBarcamps.jsx';
import '../styles/App.css';

class App extends Component {

  componentWillMount() {
    this.props.dispatch(fetchTalks());
    this.props.dispatch(fetchBarcamps());
    this.props.dispatch(fetchSpeakers());
    this.props.dispatch(getUser());
  }


  render() {


    return (
      <div>
        <Menu />
        <DisplayBarcamps />
      </div>
    );
  }
}

export default connect()(App);
