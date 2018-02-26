export default function reducer(state={
  filter: ["","",""],

}, action) {
  switch (action.type) {
    case "FILTER_BARCAMP":
      return {...state, filter: [action.payload,"",""]}

    case "FILTER_SPEAKER":
      return {...state, filter: ["",action.payload,""]}

    case "FILTER_TALK":
      return {...state, filter: ["","",action.payload]}

    case "RESET_FILTER":
      return {...state, filter: ["","",""]}
      
    default:
      return state
  }
}
