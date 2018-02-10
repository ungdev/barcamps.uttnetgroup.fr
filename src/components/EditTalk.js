import React, { Component } from 'react';
import { connect } from 'react-redux';

import TalkService from '../services/TalkService'
import { deleteTalk } from '../actions'

class EditTalk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: ""
    }
  }

  updateState(talk) {
    this.setState(talk);
  }

  componentDidMount() {
    this.updateState(this.props.talk);
  }

  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.talk);
  }

  handleClick(event){
    let content = {
      title: this.state.title,
      description: this.state.description,
      barcamp_id: this.state.barcamp_id,
      speaker_id: this.state.speaker_id
    };
    TalkService.putID(this.props.token,this.state.id,content);
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  handleDelete(event) {
    TalkService.deleteID(this.props.token,this.state.id);
    this.props.dispatch(deleteTalk(this.state.id));

  }

  handleChangeID(type, event){
    switch (type) {
      case "speaker":
        this.setState({speaker_id: event.target.value})
        break;
      case "barcamp":
        this.setState({barcamp_id: event.target.value})
        break;
      default:

    }
  }

  getListSpeakers() {
    let speakers = this.props.speakers.map(s => {
      return  <option key={s.id} value={s.id}>Par {s.firstname} {s.lastname}</option>
    });
    return(<select value={this.state.speaker_id} onChange={this.handleChangeID.bind(this,"speaker")}>
      <option value=""> </option>
      {speakers}
    </select>)
  }

  getListBarcamps() {
    let barcamps = this.props.barcamps.map(b => {
      let event = new Date(b.date);
      return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
    });
    return (<select value={this.state.barcamp_id} onChange={this.handleChangeID.bind(this,"barcamp")}>
      <option value=""> </option>
      {barcamps}
    </select>)
  }

  render() {
    return(<div>
        <h1> <input type='form' value={this.state.title} onChange={this.handleChange.bind(this,'title')} /> </h1>
        <br/>
        Description: <input type='form' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
        <br/>
        Barcamp: {this.getListBarcamps()}
        <br/>
        Speaker: {this.getListSpeakers()}
        <br/>
        <button type='button' onClick={this.handleClick.bind(this)}>Modifier</button>
        <button type ='button' onClick={this.handleDelete.bind(this)}>Supprimer</button>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    token: state.admin.token,
    barcamps: state.data.barcamps,
    speakers: state.data.speakers
  };
}

export default connect(mapStateToProps)(EditTalk);
