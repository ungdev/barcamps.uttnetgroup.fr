import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'

import Talk from './Talk.jsx';
import CreateForm from './CreateForm.jsx';
import EditTalk from './EditTalk.jsx';
import EditBarcamp from './EditBarcamp.jsx'
import EditSpeaker from './EditSpeaker.jsx'
import BarcampService from '../services/BarcampService.js';
import SpeakerService from '../services/SpeakerService.js';
//import { fetchTalks } from '../actions/index'
import '../styles/App.css'

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
    let title = "TOUS LES BARCAMPS";
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
          this.setState({speaker})
        });
    }
    if (filter[2] !== "") {
      this.setState({title: ""});
      this.setState({email: ""})
    }
  }

  showTalks() {
      if (this.props.admin.user.admin) {
        return this.props.talks.map(e => <Col sm={12} md={6}>
          <EditTalk key={e.id} talk={e} />
        </Col>);
      }
      else if (this.props.talks.length !== 0) {
        return this.props.talks.map(e => <Col sm={12} md={6}>
          <Talk key={e.id} talk={e} />
        </Col>);
      }
  }

  render() {
    let talks = this.props.talks ? this.showTalks()
    : [];
    let edit = "";
    if (this.props.filter[0] !== "" && this.props.admin.exist){
      edit = <EditBarcamp barcamp={this.state.barcamp}/>
    } else if (this.props.filter[1] !== ""  && this.props.admin.exist) {
      edit = <EditSpeaker speaker={this.state.speaker}/>
    }

    return (
        <div>
          <CreateForm />
          {edit}
          <Grid fluid className ='Talks'>
            <Row>
              {talks}
            </Row>
          </Grid>
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