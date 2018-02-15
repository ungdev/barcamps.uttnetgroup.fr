import React, { Component } from 'react';
import { connect } from 'react-redux';

import { filter, apply } from '../actions'
import '../styles/Talk.css';

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
    let event = new Date(talk.barcamp.date);
    let options = {year: 'numeric', month: 'long', day: 'numeric' };
    this.setState({date: event.toLocaleDateString('fr-FR', options)});
  //  this.renderPDF(talk.slides);

  }

  // URL à personnaliser pour votre propre utilisation
  /*renderPDF(pdfUrl) {
   PDFJS.getDocument(pdfUrl).then(function (pdf) {
   pdf.getPage(1).then(function (page) {
   var pdfPage = document.getElementById('pdf-page');
   this.renderPDFPage(page, pdfPage);
   });
   return;
   });
  }

  renderPDFPage(page, canvas) {
   var scale = 1.5;
   var viewport = page.getViewport(scale);
   var context = canvas.getContext('2d');
   canvas.height = viewport.height;
   canvas.width = viewport.width;
   var renderContext = {
   canvasContext: context,
   viewport: viewport
   };
   page.render(renderContext);
 } */

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
        <h1> {this.state.talk.title}
        <a className="PDF" href={this.state.talk.slides} target="_blank">
        </a>
        </h1>

        <p>
          <a className='Clickable' onClick={this.handleClick.bind(this,"barcamp",this.state.talk.barcamp_id)}> {this.state.talk.barcamp.title} </a>
          par <a className='Clickable' onClick={this.handleClick.bind(this,"speaker",this.state.talk.speaker_id)}> {this.state.talk.speaker.firstname} {this.state.talk.speaker.lastname} </a>
          le {this.state.date}
          <p> {this.state.talk.description} </p>
        </p>
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
