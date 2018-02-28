import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


import { filter, apply } from '../actions'

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      barcamps: [],
      speakers: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({barcamp: nextProps.filter[0]});
    this.setState({speaker: nextProps.filter[1]});
    this.setState({talk: nextProps.filter[2]})

  }

  handleChange(type,index, value) {
    console.log(value);
    console.log(index);
    this.setState({[type]: value});
    /*var p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,event.target.value)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))}) */
  }

  render() {
    var i = 0;
    var barcamps = this.props.barcamps.map(b => {
      i++;
      var event = new Date(b.date);
      return <MenuItem id={b.id} value={i} primaryText={`${b.title} le ${event.toLocaleDateString('fr-FR')}`}/>
    });
    i=0;
    var speakers = this.props.speakers.map(s => {
      i++;
      return  <MenuItem id={s.id} value={i} primaryText={`Par ${s.firstname} ${s.lastname}`}/>
    });
    var talks ="";
    i=0;
    if (this.props.talks !== undefined) {
      if (this.props.talks.length != 0 ){
        talks = this.props.talks.map(t => {
          i++;
          return <MenuItem id={t.id} value={i} primaryText={t.title}/>});
      }
    }
    return(
      <div>
        <div className='Header'>
          <h1 key="bar"> BARCAMPS </h1>
          <p> Les présentations </p>
        </div>
        <div className='Categories'>
          <SelectField
            floatingLabelText="Barcamp"
            value={this.state.barcamp}
            onChange={this.handleChange.bind(this,"barcamp")}
          >
            <MenuItem value={1} id={0} primaryText="" />
            {barcamps}
          </SelectField>
          <SelectField
            floatingLabelText="speaker"
            value={this.state.speaker}
            onChange={this.handleChange.bind(this,"speaker")}
          >
            <MenuItem value={1} id={0} primaryText="" />
            {speakers}
          </SelectField>
          <SelectField
            floatingLabelText="talk"
            value={this.state.talk}
            onChange={this.handleChange.bind(this,"talk")}
          >
            <MenuItem value={1} id={0} primaryText="" />
            {talks}
          </SelectField>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    talks: state.data.talks,
    filter: state.filter.filter,
    barcamps: state.data.barcamps,
    speakers: state.data.speakers
  };
}

export default connect(mapStateToProps)(Navbar);
