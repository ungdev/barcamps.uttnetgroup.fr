import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTalks, fetchBarcamps, fetchSpeakers } from '../actions';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import Admin from './Admin.js';
import '../styles/App.css';

class App extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(fetchTalks());
    this.props.dispatch(fetchBarcamps());
    this.props.dispatch(fetchSpeakers());
  }

  openMenu(){
    document.getElementById("Sidebar").style.left = "0px";
    document.getElementById("Sidebar").style.padding = "1em";
    document.getElementById("Close").style.display = "block";
    document.getElementById("Menu").style.display = "none";
  }

  closeMenu(){
    document.getElementById("Close").style.display = "";
    document.getElementById("Menu").style.display = "";
    document.getElementById("Sidebar").style.left = "";
    document.getElementById("Sidebar").style.padding = "";

  }


  render() {


    return (
      <div>
        <div className = 'Background'></div>
        <div className = 'Sidebar' id = 'Sidebar'>
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
