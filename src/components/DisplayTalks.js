import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Talk from './Talk.js';
import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
import { fetch } from '../actions/index'

class DisplayTalks extends Component {

  constructor(props) {
    super(props);
    this.state={
      title: "",
      email: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateTitle(nextProps.talks,nextProps.filter);
  }

  updateTitle(talks, filter) {
    var title = "Tous les Barcamps";
    if (filter.toString() === ",,") {
      this.setState({title});
      this.setState({email: ""})
    }
    if (filter[0] !== "") {
    BarcampService.getID(filter[0])
      .then(barcamp => {
        title = "Présentations du barcamp: " + barcamp.title;
        this.setState({title});
        this.setState({email: ""})
      });
    }
    if (filter[1] !== "") {
      SpeakerService.getID(filter[1])
        .then(speaker => {
          if (title !== "") {
            title += " par ";
          } else {
            title = "Présentations de ";
          }
          title += speaker.firstname + " " + speaker.lastname;
          this.setState({title});
          this.setState({email: speaker.email})
        });
    }
    if (filter[2] !== "") {
      this.setState({title: ""});
      this.setState({email: ""})
    }
  }

  render() {
    var talks ="";
    if (this.props.talks !== undefined) {
      if (this.props.talks.length != 0 ){
        talks = this.props.talks.map(e => <Talk key={e.id} talk={e} />);
      }
    }
    return (
      <div className="Presentations">
        <h1> {this.state.title} </h1>
        <p> {this.state.email} </p>
        <br/>
        {talks}
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

function matchDispatchToProps(dispatch){
  return bindActionCreators({fetch: fetch}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(DisplayTalks);
