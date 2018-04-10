import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
//import { Document, Page } from 'react-pdf';
import { Overlay,Popover, Button} from 'react-bootstrap'

import { filter, apply } from '../actions'
import '../styles/Talk.css';
import SpeakerInfo from './SpeakerInfo.jsx'



class Talk extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  handleClick(type,id) {
    let p1 = new Promise((resolve,reject) => {
      resolve(this.props.dispatch(filter(type,id)))});
    p1.then(() => {
      this.props.dispatch(apply(this.props.filter))})

  }

  render() {

    const speakerData = this.props.speakers.filter(s => s.id === this.props.talk.speaker.id);

    return(<div className='Talk'>
        <h1 className='Title'>
          {this.props.talk.title}
          {/*s<a className="PDF" href={this.state.talk.slides} target="_blank">
            <Document file={this.state.talk.slides}>
              <Page pageNumber={1} scale={0.3} />
            </Document>
          </a>*/}
        </h1>
        <p> {this.props.talk.description} </p>
        <div className='Description'>
        <Button bsStyle="link" onMouseOver={() =>this.setState({show: true})} onMouseOut={() =>this.setState({show: false})} ref={button => {
            this.target = button;
          }}>
          Par {this.props.talk.speaker.firstname} {this.props.talk.speaker.lastname}
        </Button>
        <Overlay trigger={['hover']} placement="top" show={this.state.show} target={() => ReactDOM.findDOMNode(this.target)}>
          <Popover id="popover-positioned-top" title="Profil" onMouseOver={() => this.setState({show: true})}
                                      onMouseLeave={() => this.setState({show: false})} >
            <SpeakerInfo speaker={speakerData[0]}/>
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
    admin : state.admin,
    speakers : state.data.speakers
  };
}

export default connect(mapStateToProps)(Talk);
