import React, { Component } from 'react';

class Presentations extends Component {

  constructor(props) {
    super(props);
    this.state={talks : []};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({talks: nextProps.talks})
  }

  render() {
    var talks = ""
    if (!this.state.talks.length == 0) {
      talks = this.state.talks.map(e => <h1 key={e.id}> {e.title} </h1>);
    }
    return (
      <div className="Presentations">
        {talks}
      </div>
    );
  }

}

export default Presentations;
