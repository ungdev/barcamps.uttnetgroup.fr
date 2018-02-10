import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Talk from './Talk.js';
import CreateForm from './CreateForm';
import EditTalk from './EditTalk';
import EditBarcamp from './EditBarcamp'
import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
import { fetchTalks } from '../actions/index'

class DisplayTalks extends Component {

  constructor(props) {
    super(props);
    this.state={
      title: "",
      email: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.updateTitle(nextProps.filter);
  }

  updateTitle(filter) {
    let title = "Tous les Barcamps";
    if (filter.toString() === ",,") {
      this.setState({title});
      this.setState({email: ""})
    }
    if (filter[0] !== "") {
    BarcampService.getID(filter[0])
      .then(barcamp => {
        title = "Présentations du barcamp: " + barcamp.title;
        this.setState({barcamp})
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
    let talks ="";
    if (this.props.talks !== undefined) {
      if (this.props.admin.exist) {
        talks = this.props.talks.map(e => <EditTalk key={e.id} talk={e} />);
      }
      else if (this.props.talks.length != 0) {
        talks = this.props.talks.map(e => <Talk key={e.id} talk={e} />);
      }
    }
    let edit = "";
    if (this.props.filter[0] !== ""){
      edit = <EditBarcamp barcamp={this.state.barcamp}/>
    }
    
    return (
      <div className="Presentations">
        <h1> {this.state.title} </h1>
        <a href={`mailto:${this.state.email}`}> {this.state.email} </a>
        <br/>
        <CreateForm />
        <br/>
        {edit}
        <br/>
        <a className='Clickable' onClick={() => this.props.dispatch(fetchTalks())}> Tous afficher </a>
        {talks}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    filter: state.filter.filter,
    talks: state.data.talks,
    admin: state.admin
  };
}

export default connect(mapStateToProps)(DisplayTalks);
