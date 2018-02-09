import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchTalks, fetchBarcamps, fetchSpeakers } from '../actions';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import Admin from './Admin.js';
import '../App.css';

class App extends Component {

  componentWillMount() {
    this.props.dispatch(fetchTalks());
    this.props.dispatch(fetchBarcamps());
    this.props.dispatch(fetchSpeakers());
  }

  render() {
    return (
      <div>
        <div className = 'Sidebar'>
          <Admin />
          <Navbar />
        </div>
        <div className = 'Content'>
          <DisplayTalks />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(App);
