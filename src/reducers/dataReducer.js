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
    case "DELETE_BARCAMP":
      let barcamps = state.barcamps.filter(b => b.id !== action.payload);
      return {...state, barcamps: barcamps};
    case "UPDATE_BARCAMP":
      let nbarcamps = state.barcamps.concat();
      let barcamp = state.barcamps[action.payload.id];
      barcamp = Object.assign(barcamp, action.payload);
      nbarcamps.splice(action.payload.id, 1, barcamp);
      return {...state, barcamps: nbarcamps}
    default:
      return state
  }
}
