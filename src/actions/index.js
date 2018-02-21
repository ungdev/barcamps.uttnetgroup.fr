import TalkService from '../services/TalkService';
import BarcampService from '../services/BarcampService';
import SpeakerService from '../services/SpeakerService';

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
        dispatch({type: "FETCH__TALKS", payload: talks})
      })
    }
}

export function fetchTalks(){
  return function(dispatch) {
    TalkService.get()
        .then(talks => {
          dispatch({type: "RESET_FILTER", payload: 1});
          dispatch({type: "FETCH__TALKS", payload: talks})
      });
  }
}

export function fetchBarcamps(){
  return function(dispatch) {
    BarcampService.get()
        .then(barcamps => dispatch({type: "FETCH__BARCAMPS", payload: barcamps}));
  }
}

export function fetchSpeakers(){
  return function(dispatch) {
    SpeakerService.get()
        .then(speakers => dispatch({type: "FETCH__SPEAKERS", payload: speakers}));
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

export function deleteTalk(id) {
  return {
    type :"DELETE_TALK",
    payload: id
  }
}

export function addTalk(talk) {
  return {
    type: "ADD_TALK",
    payload: talk
  }
}

export function deleteBarcamp(id){
  return {
    type : "DELETE_BARCAMP",
    payload: id
  }
}

export function updateBarcamp(barcamp){
  return {
    type: "UPDATE_BARCAMP",
    payload: barcamp
  }
}

export function deleteSpeaker(id){
  return {type: "RESET_FILTER", payload: 1};
}

export function updateSpeaker(speaker){
  return {
    type: "UPDATE_SPEAKER",
    payload: speaker
  }
}
