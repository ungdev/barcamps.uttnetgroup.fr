export default function reducer(state={
  create: "",

}, action) {
  switch (action.type) {
    case "CREATE":
      return {...state, create: action.payload}

    case "RESET_CREATE":
      return {...state, create: ""}

    default:
      return state
  }
}
