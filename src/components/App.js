import React, { Component } from 'react';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import Admin from './Admin.js';
import TalkService from '../services/TalkService.js'
import '../App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      filter: ["","",""],
      talks: []
    };
  }

  handleFilterUpdate(filterValue) {
    this.setState({filter: filterValue});
    this._fetch();
  }

  componentDidMount() {
    this._fetch();
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
          <Navbar talks={this.state.talks} filter={this.state.filter} updateFilter={this.handleFilterUpdate.bind(this)}/>
        </div>
        <div className = 'Content'>
          <DisplayTalks filter = {this.state.filter} talks = {this.state.talks} updateFilter={this.handleFilterUpdate.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
