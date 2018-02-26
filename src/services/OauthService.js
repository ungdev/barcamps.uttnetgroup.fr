import Service from "./Service.js";

class OauthService extends Service {
  constructor(name) {
    super(name);
  }
}

export default new OauthService('oauth/token');
