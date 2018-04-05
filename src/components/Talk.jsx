import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Document, Page } from 'react-pdf';
import { Overlay,Popover, Button} from 'react-bootstrap'

import { filter, apply } from '../actions'
import '../styles/Talk.css';



class Talk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      talk: {
        barcamp: {},
        speaker: {}
      },
      date: ""
    }
  }

  updateState(talk) {
    this.setState({talk});
    let event = new Date(talk.barcamp.date);
    let options = {year: 'numeric', month: 'long', day: 'numeric' };
    this.setState({date: event.toLocaleDateString('fr-FR', options)});
  }

  componentDidMount() {
    this.updateState(this.props.talk);
  }

  componentWillReceiveProps(nextProps){
    this.updateState(nextProps.talk);
  }

  handleClick(type,id) {
    let p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,id)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))})

  }

  render() {

    return(<div className='Talk'>
        <h1 className='Title'>
          {this.state.talk.title}
          <a className="PDF" href={this.state.talk.slides} target="_blank">
            <Document file={this.state.talk.slides}>
              <Page pageNumber={1} scale={0.3} />
            </Document>
          </a>
        </h1>
        <p> {this.state.talk.description} </p>
        <div className='Description'>
        <Button bsStyle="link"  onMouseOver={() =>this.setState({show: true})} ref={button => {
            this.target = button;
          }}>
          Par {this.state.talk.speaker.firstname} {this.state.talk.speaker.lastname}
        </Button>
        <Overlay trigger={['hover']} placement="top" show={this.state.show} target={() => ReactDOM.findDOMNode(this.target)}>
          <Popover id="popover-positioned-top" title="Profil" onMouseOver={() => this.setState({show: true})}
                                      onMouseLeave={() =>this.setState({show: false})} >
            <strong>Liste barcamps</strong> A remplir.
          </Popover>
        </Overlay>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    filter : state.filter.filter,
    admin : state.admin
  };
}

export default connect(mapStateToProps)(Talk);
