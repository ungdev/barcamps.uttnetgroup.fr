import { combineReducers } from "redux"

import filter from "./filterReducer"
import talks from "./talksReducer"
import JWT from "./JWTReducer"

export default combineReducers({
  filter,
  talks,
  JWT
})
