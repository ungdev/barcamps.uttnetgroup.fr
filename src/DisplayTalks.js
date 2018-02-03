import React, { Component } from 'react';
import Talk from './Talk.js'

class DisplayTalks extends Component {

  constructor(props) {
    super(props);
    this.state={talks : []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({talks: nextProps.talks})
  }

  render() {
    var talks = ""
    if (!this.state.talks.length === 0) {
      talks = this.state.talks.map(e => <Talk talk={e}/>);
    }
    return (
      <div className="Presentations">
        {talks}
      </div>
    );
  }

}

export default DisplayTalks;
