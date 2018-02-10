import TalkService from '../services/TalkService';

export default function reducer(state={
  talks: [],
  speakers: [],
  barcamps: []
}, action) {

  switch (action.type) {
    case "FETCH__TALKS":
      return {...state,
        talks: action.payload
      };
    case "FETCH__BARCAMPS":
      return {...state,
        barcamps: action.payload
      };
    case "FETCH__SPEAKERS":
      return {...state,
        speakers: action.payload
      };
    case "DELETE_TALK":
      let talks = state.talks.filter(t => t.id !== action.payload);
      return {...state, talks: talks};
    case "ADD_TALK":
      let newTalks = state.talks.concat();
      newTalks.push(action.payload);
      return {...state, talks: newTalks};
    default:
      return state
  }
}
