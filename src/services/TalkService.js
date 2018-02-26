import Service from "./Service.js";

class TalkService extends Service {
  constructor(name) {
    super(name);
  }
}

export default new TalkService('talk');
