import { combineReducers } from "redux"

import filter from "./filterReducer"
import data from "./dataReducer"
import admin from "./adminReducer"
import create from "./createReducer"

export default combineReducers({
  filter,
  data,
  admin,
  create
})
