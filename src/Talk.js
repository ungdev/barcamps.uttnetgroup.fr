import React, { Component } from 'react';

class Talk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talk: {},
      speaker: {},
      barcamp: {},
      date: ''
    }
  }

  updateState(talk) {
    this.setState({talk});
    fetch('https://api.barcamps.uttnetgroup.fr/api/speaker/'+talk.speaker+'/?format=json')
      .then(result => result.json())
      .then(speaker => this.setState({speaker}));
    fetch('https://api.barcamps.uttnetgroup.fr/api/barcamp/'+talk.barcamp+'/?format=json')
      .then(result => result.json())
      .then(barcamp => this.setState({barcamp}))
      .then(() => {
        var event = new Date(this.state.barcamp.date);
        var options = {year: 'numeric', month: 'long', day: 'numeric' };
        this.setState({date: event.toLocaleDateString('fr-FR', options)});
      });
  }

  componentDidMount() {
    this.updateState(this.props.talk);
  }

  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.talk);
  }

  render() {
    return(
      <div>
        <h1> {this.state.talk.title} </h1>
        <p> {this.state.barcamp.title} par {this.state.speaker.firstname}  {this.state.speaker.lastname} le {this.state.date} </p>
      </div>
    )
  }

}

export default Talk;
