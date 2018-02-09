import TalkService from '../services/TalkService';

export default function reducer(state={
  talks: [],
  speakers: [],
  barcamps: []
}, action) {

  switch (action.type) {
    case "UPDATE":
      return {...state,
        talks: action.payload.talks,
        speakers: action.payload.speakers,
        barcamps: action.payload.barcamps
      };
    case "FETCH__FULFILLED":
      return {...state,
        talks: action.payload.talks,
        speakers: action.payload.speakers,
        barcamps: action.payload.barcamps
      };
    default:
      return state
  }
}
