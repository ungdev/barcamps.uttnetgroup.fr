import React, { Component } from 'react';
import { connect } from 'react-redux';

import { create } from '../actions'
import BarcampService from '../services/BarcampService.js';
import '../styles/Talk.css';

const initialState = {
  title: '',
  description: '',
  date:''
};

class CreateBarcamp extends Component {

  componentWillMount(){
    this.setState(initialState);
  }

  handleClick(event){
    let content = {};
    let date = new Date(this.state.date)
    date = date.toISOString()
    content = {
      title: this.state.title,
      description: this.state.description,
      date: date
      };
    BarcampService.post(this.props.token,content);
    this.setState(initialState);
    this.props.dispatch(create(""))
  }

  handleChange(type,event){
    this.setState({[type]: event.target.value})
  }

  render() {
    return(
      <div className='Talk'>
        <p>Création barcamp:</p>
        <br/>
        Titre: <input type='text' value={this.state.title} onChange={this.handleChange.bind(this,'title')} />
        <br/>
        Description: <input type='text' value={this.state.description} onChange={this.handleChange.bind(this,'description')} />
        <br/>
        Date: <input type='date' value={this.state.date} onChange={this.handleChange.bind(this,'date')} />
        <br/>
        <button type='button' onClick={this.handleClick.bind(this,"barcamp")}>Ajouter</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.admin.token
  };
}

export default connect(mapStateToProps)(CreateBarcamp);
