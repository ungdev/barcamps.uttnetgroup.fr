import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { filter, apply } from '../actions'

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

  handleClick(type,id) {
    var p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,id)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))})

  }

  render() {
    return(<div>
        <h1> {this.state.talk.title} </h1>
        <p>
          <a className='Clickable' onClick={this.handleClick.bind(this,"barcamp",this.state.talk.barcamp_id)}> {this.state.talk.barcamp.title} </a>
          par <a className='Clickable' onClick={this.handleClick.bind(this,"speaker",this.state.talk.speaker_id)}> {this.state.talk.speaker.firstname} {this.state.talk.speaker.lastname} </a>
          le {this.state.date}
        </p>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    filter : state.filter.filter
  };
}

export default connect(mapStateToProps)(Talk);
