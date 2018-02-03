import React, { Component } from 'react';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      presentation: "",
      barcampID: "",
      barcamps: []
    }
  }

  handleChange(type,event) {
    switch (type) {
      case 'bar':
        this.setState({barcampID: event.target.value});
        break;
      case 'pres':
        this.setState({presentation: event.target.value});
        break;
      default:
    }
  }

  handleClick(event) {
    const filter = [this.state.barcampID,this.state.presentation]
    this.props.updateFilter(filter)
  }

  componentDidMount() {
    fetch('https://api.barcamps.uttnetgroup.fr/api/barcamp/?format=json')
      .then(result => result.json())
      .then(barcamps => this.setState({barcamps}))
  }

  render() {
    const barcamps = this.state.barcamps.map(b => {
      var event = new Date(b.date);
      return  <option key={b.id} value={b.id}>{b.title} le {event.toLocaleDateString('fr-FR')}</option>
    })
    return(
      <div>
        <div className='Header'>
          <h1 key="bar"> BARCAMPS </h1>
          <p> Les présentations </p>
        </div>
        <div className='Categories'>
          <label>
            Barcamps :
            <select value={this.state.bar} onChange={this.handleChange.bind(this,"bar")}>
              <option value=""> </option>
              {barcamps}
            </select>
          </label><br/><br/>
          Nom de la présentation: <input type="text" value={this.state.presentation} onChange={this.handleChange.bind(this,"pres")}/><br/><br/>
          <button onClick={this.handleClick.bind(this)}>
            Filtrer
          </button>
        </div>
        <ul className='Link'>
          <li className='Link'>
            <a className = 'Link' href="https://ung.utt.fr/">Site UNG</a>
          </li>
          <li className='Link'>
            <a className = 'Link' href="https://www.facebook.com/uttnetgroup/">UNG</a>
          </li>
          <li className='Link'>
            <a className = 'Link' href="https://www.facebook.com/barcampsUTT/">Barcamps</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar
