import React, { Component } from 'react';
import Talk from './Talk.js'

class DisplayTalks extends Component {

  constructor(props) {
    super(props);
    this.state={
      talks : [],
      filter: ["","",""],
      title: "",
      email: ""
    };
  }

  componentDidMount() {
    this.updateState(this.props.talks,this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps.talks,nextProps.filter);
  }

  updateState(talks, filter) {
    this.setState({talks});
    this.setState({filter});
    var title = "Tous les Barcamps";
    if (filter.toString() === ",,") {
      this.setState({title});
    }
    if (filter[0] !== "") {
    fetch('https://api.barcamps.uttnetgroup.fr/api/barcamp/'+filter[0]+'/?format=json')
      .then(result => result.json())
      .then(barcamp => {
        title = "Présentations du barcamp: " + barcamp.title;
        this.setState({title});
        console.log('TA MERE');
      });
    }
    if (filter[1] !== "") {
      fetch('https://api.barcamps.uttnetgroup.fr/api/speaker/'+filter[1]+'/?format=json')
        .then(result => result.json())
        .then(speaker => {
          if (title !== "") {
            title += " par ";
          } else {
            title = "Présentations de ";
          }
          title += speaker.firstname + " " + speaker.lastname;
          this.setState({title});
          this.setState({email: speaker.email})
        });
    }
    if (filter[2] !== "") {
      this.setState({title: ""})
    }
  }

  render() {
    var talks = ""
    if (!this.state.talks.length == 0) {
      talks = this.state.talks.map(e => <Talk key={e.id} talk={e} updateFilter={this.props.updateFilter}/>);
    }
    return (
      <div className="Presentations">
        <h1> {this.state.title} </h1>
        <p> {this.state.email} </p>
        <br/>
        {talks}
      </div>
    );
  }

}

export default DisplayTalks;
