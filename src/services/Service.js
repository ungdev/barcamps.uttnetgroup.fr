export default class Service {
  constructor(name) {
    this.name = name;
  }

  get() {
    return fetch(`https://api.barcamps.uttnetgroup.fr/api/${this.name}/?format=json`)
      .then(result => result.json())
  }

  getID(id) {
    return fetch(`https://api.barcamps.uttnetgroup.fr/api/${this.name}/${id}/?format=json`)
      .then(result => result.json())
  }

}
