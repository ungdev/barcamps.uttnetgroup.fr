import Service from "./Service.js";

class SpeakerService extends Service {
  constructor(name) {
    super(name);
  }
}

export default new SpeakerService('speaker');
