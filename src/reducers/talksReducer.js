import TalkService from '../services/TalkService';

export default function reducer(state={
  talks: undefined,
}, action) {

  switch (action.type) {
    case "UPDATE":
      return {...state, talks: action.payload};
    case "FETCH__FULFILLED":
      return {...state, talks: action.payload};
    default:
      return state
  }
}
