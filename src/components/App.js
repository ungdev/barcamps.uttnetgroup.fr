import React, { Component } from 'react';
import { connect } from 'react-redux';


import { fetchTalks, fetchBarcamps, fetchSpeakers } from '../actions';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import Admin from './Admin.js';
import '../styles/App.css';

class App extends Component {

  componentWillMount() {
    this.props.dispatch(fetchTalks());
    this.props.dispatch(fetchBarcamps());
    this.props.dispatch(fetchSpeakers());
  }

  render() {
    return (
      <div>
        <div className = 'Background'></div>
        <div className = 'Sidebar'>
          <Admin />
          <Navbar />
        </div>
        <DisplayTalks />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(App);
