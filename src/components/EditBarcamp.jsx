import React, { Component } from 'react';
import { connect } from 'react-redux';

import BarcampService from '../services/BarcampService'
import { deleteBarcamp, updateBarcamp, fetchTalks } from '../actions'
import '../styles/Talk.css';

class EditBarcamp extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  updateState(barcamp) {
    let date = barcamp.date.slice(0,10);
    barcamp.date = date;
    this.setState(barcamp);
  }
  
  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.barcamp);
  }

  handleClick(event){
    let date = new Date(this.state.date)
    date = date.toISOString()
    let content = {
      title: this.state.title,
      description: this.state.description,
      date: date
    };
    console.log(content);
    BarcampService.putID(this.props.token,this.state.id,content);
    content = {...content, id: this.state.id};
    this.props.dispatch(updateBarcamp(content))
  }

  handleChange(type,event){
      this.setState({[type]: event.target.value})
  }

  handleDelete(event) {
    BarcampService.deleteID(this.props.token,this.state.id);
    this.props.dispatch(deleteBarcamp(this.state.id));
    this.props.dispatch(fetchTalks())
  }

  render() {
    return(
      <div className='Talk'>
        <h1> <input type='text' value={this.state.title} onChange={this.handleChange.bind(this,'title')} /> </h1>
        <br/>
        Description: <input type='form' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
        <br/>
        Date: <input type='date' value={this.state.date} onChange={this.handleChange.bind(this,'date')} />
        <br/>
        <button type='button' onClick={this.handleClick.bind(this)}>Modifier</button>
        <button type ='button' onClick={this.handleDelete.bind(this)}>Supprimer</button>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    token: state.admin.token
  };
}

export default connect(mapStateToProps)(EditBarcamp);
