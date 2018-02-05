import Service from "./Service.js";

class BarcampService extends Service {
  constructor(name) {
    super(name);
  }
}

export default new BarcampService('barcamp');
