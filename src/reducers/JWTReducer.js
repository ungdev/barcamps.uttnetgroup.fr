export default function reducer(state={
  JWT: [],

}, action) {
  switch (action.type) {
    case "ADD_JWT":
      var JWT = state.JWT.concat(action.payload);
      return {...state, JWT}
    default:
      return state
  }
}
