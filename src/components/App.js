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

  openMenu(){
    document.getElementById("Sidebar").style.width = "275px";
    document.getElementById("Sidebar").style.padding = "1em";
    document.getElementById("Close").style.display = "block";
    document.getElementById("Menu").style.display = "none";
  }

  closeMenu(){
    document.getElementById("Menu").style.display = "block";
    document.getElementById("Sidebar").style.width = "0";
    document.getElementById("Sidebar").style.padding = "0";

  }


  render() {
    return (
      <div>
        <div className = 'Background'></div>
        <div id='Sidebar' className = 'Sidebar'>
          <a id="Close" className="Close" onClick={this.closeMenu.bind(this)}>&#9587;</a>
          <Admin />
          <Navbar />
        </div>
        <a id="Menu" className="Menu" onClick={this.openMenu.bind(this)}>&#9776;</a>
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
