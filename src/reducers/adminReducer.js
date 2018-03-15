var jwt = require('jsonwebtoken')

export default function reducer(state={
  token: "",
  user: {},
  exist: false

}, action) {
  switch (action.type) {
    case "ADD_USER":
      var user = jwt.decode(action.payload);
      return {...state, token: action.payload, user, exist: true}
    default:
      return state
  }
}
