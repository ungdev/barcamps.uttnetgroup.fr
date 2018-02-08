import TalkService from '../services/TalkService';

export function filter(type, ID){
  switch (type) {
    case "barcamp":
      return {
        type: "FILTER_BARCAMP",
        payload: ID
      }
    case "speaker":
      return {
        type: "FILTER_SPEAKER",
        payload: ID
      }
    case "talk":
      return {
        type: "FILTER_TALK",
        payload: ID
      }
    default:
      return console.log('ERRROR');
  }
}

export function apply(filter){
  return function(dispatch) {
    TalkService.get()
      .then(talks => {
        talks = talks.filter(t =>
          t.barcamp_id.toString().match(filter[0]) && t.speaker_id.toString().match(filter[1]) && t.id.toString().match(filter[2]));
        return talks;
      })
      .then(talks => {
        dispatch({type: "UPDATE", payload: talks})
      })
    }
}

export function fetch(){
  return function(dispatch) {
    TalkService.get()
      .then(talks => {
        dispatch({type: "RESET_FILTER", payload: 1})
        dispatch({type: "FETCH__FULFILLED", payload: talks})
      });
  }
}

export function addUser(token) {
  return {
    type: "ADD_USER",
    payload: token
  }
}

export function create(type) {
  return {
    type: "CREATE",
    payload: type
  }
}
