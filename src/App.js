import React, { Component } from 'react';
import Navbar from './Navbar.js';
import DisplayTalks from './DisplayTalks.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {filter: [/\d*/,/.*/]};
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
        console.log(talks);
        talks = talks.filter(t => t.barcamp.toString().match(this.state.filter[0]) && t.title.match(this.state.filter[1]));
        console.log(talks);
        return talks;}
      )
      .then(talks => this.setState({talks}))
    }

  render() {
    return (
      <div>
        <div className = 'Sidebar'>
          <Navbar updateFilter={this.handleFilterUpdate.bind(this)}/>
        </div>
        <div className = 'Content'>
          <DisplayTalks talks = {this.state.talks}/>
        </div>
      </div>
    );
  }
}

export default App;
