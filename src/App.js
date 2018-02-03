import React, { Component } from 'react';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import './App.css';

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
    fetch('https://api.barcamps.uttnetgroup.fr/api/talk/?format=json')
      .then(result => result.json())
      .then(talks => {
        talks = talks.filter(t =>
          t.barcamp.toString().match(this.state.filter[0]) && t.speaker.toString().match(this.state.filter[1]) && t.id.toString().match(this.state.filter[2]));
        return talks;
      })
      .then(talks => this.setState({talks}))
    }

  render() {
    return (
      <div>
        <div className = 'Sidebar'>
          <Navbar talks={this.state.talks} filter={this.state.filter} updateFilter={this.handleFilterUpdate.bind(this)}/>
        </div>
        <div className = 'Content'>
          <DisplayTalks talks = {this.state.talks} updateFilter={this.handleFilterUpdate.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
