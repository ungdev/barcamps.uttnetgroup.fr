import React, { Component } from 'react';

class Talk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      talk: {
        barcamp: {},
        speaker: {}
      },
      date: ""
    }
  }

  updateState(talk) {
    this.setState({talk});
    var event = new Date(talk.barcamp.date);
    var options = {year: 'numeric', month: 'long', day: 'numeric' };
    this.setState({date: event.toLocaleDateString('fr-FR', options)});

  }

  componentDidMount() {
    this.updateState(this.props.talk);
  }

  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.talk);
  }

  handleClick(type,event) {
    var filter = []
    switch (type) {
      case "bar":
        filter = [this.state.talk.barcamp.id,"",""];
        break;
      case "speaker":
        filter = ["",this.state.talk.speaker.id,""];
        break;
      default:
    }
    this.props.updateFilter(filter)
  }

  render() {
    return(<div>
        <h1> {this.state.talk.title} </h1>
        <p>
          <a className='Clickable' onClick={this.handleClick.bind(this,"bar")}> {this.state.talk.barcamp.title} </a>
          par <a className='Clickable' onClick={this.handleClick.bind(this,"speaker")}> {this.state.talk.speaker.firstname} {this.state.talk.speaker.lastname} </a>
          le {this.state.date}
        </p>
      </div>
    )
  }

}

export default Talk;
