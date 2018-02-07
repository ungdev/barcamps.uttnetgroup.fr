var jwt = require('jsonwebtoken')

export default function reducer(state={
  token: "",
  user: {}

}, action) {
  switch (action.type) {
    case "ADD_USER":
      var user =  jwt.decode(action.payload);
      return {...state, token: action.payload, user}
    default:
      return state
  }
}
