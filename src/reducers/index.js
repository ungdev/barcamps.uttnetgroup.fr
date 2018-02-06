import { combineReducers } from "redux"

import filter from "./filterReducer"
import talks from "./talksReducer"

export default combineReducers({
  filter,
  talks,
})
