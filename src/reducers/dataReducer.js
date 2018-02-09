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
    default:
      return state
  }
}
