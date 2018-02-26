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

  post(token, content){
    var form = new FormData();
    content = Object.entries(content);
    content.forEach(c => {
      if (c[0] === "barcamp_id" || c[0] === "speaker_id") {
        c[1] = Number(c[1]);
        console.log(c[1]);
      }
      form.append(c[0].toString(),c[1])
    });
    token = "Bearer " + token;
    var setting = {method: 'POST', headers: {"Authorization": token}, body: form}
    fetch(`https://api.barcamps.uttnetgroup.fr/api/${this.name}/`,setting)
  }

  putID(token, id, content){
    var form = new FormData();
    content = Object.entries(content);
    content.forEach(c => {
      if (c[0] === "barcamp_id" || c[0] === "speaker_id") {
        c[1] = Number(c[1]);
      }
      form.append(c[0].toString(),c[1])
    });
    token = "Bearer " + token;
    var setting = {method: 'PUT', headers: {"Authorization": token}, body: form}
    fetch(`https://api.barcamps.uttnetgroup.fr/api/${this.name}/${id}/`,setting)
  }

  deleteID(token,id){
    token = "Bearer " + token;
    var setting = {method: 'DELETE', headers: {"Authorization": token}}
    fetch(`https://api.barcamps.uttnetgroup.fr/api/${this.name}/${id}/`,setting)
  }

}
