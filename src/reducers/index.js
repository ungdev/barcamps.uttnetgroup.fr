import { combineReducers } from "redux"

import filter from "./filterReducer"
import talks from "./talksReducer"
import admin from "./adminReducer"

export default combineReducers({
  filter,
  talks,
  admin
})
