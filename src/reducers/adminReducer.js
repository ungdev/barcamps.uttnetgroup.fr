var jwt = require('jsonwebtoken')

export default function reducer(state={
  token: "",
  user: {},
  exist: false

}, action) {
  switch (action.type) {
    case "ADD_USER":
      localStorage.setItem('jwtBarcamp',action.payload);
      let user = jwt.decode(action.payload);
      return {...state, token: action.payload, user, exist: true}
    case "GET_USER":
      if(localStorage.getItem('jwtBarcamp')) {
        let token = localStorage.getItem('jwtBarcamp')
        let user = jwt.decode(token);
        return {...state, token, user, exist: true}
      } else {
        return state
      }
    default:
      return state
  }
}
