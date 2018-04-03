import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTalks, fetchBarcamps, fetchSpeakers } from '../actions';
import Menu from './Menu.jsx';
import DisplayTalks from './DisplayTalks.jsx';
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
        <Menu />
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
