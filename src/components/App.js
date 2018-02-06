import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetch } from '../actions';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import Admin from './Admin.js';
import TalkService from '../services/TalkService.js'
import '../App.css';

class App extends Component {

  componentWillMount() {
    console.log('COUCOU APP');
    this.props.dispatch(fetch());
  }

  _fetch() {
    TalkService.get()
      .then(talks => {
        talks = talks.filter(t =>
          t.barcamp_id.toString().match(this.state.filter[0]) && t.speaker_id.toString().match(this.state.filter[1]) && t.id.toString().match(this.state.filter[2]));
        return talks;
      })
      .then(talks => this.setState({talks}))
    }

  render() {
    return (
      <div>
        <div className = 'Sidebar'>
          <Admin />
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
    filter: state.filter.filter,
    talks: state.talks.talks,
  };
}
export default connect(mapStateToProps)(App);
