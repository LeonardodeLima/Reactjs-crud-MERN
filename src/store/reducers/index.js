import { combineReducers } from "redux"
import error from "./error"
import nota  from "./nota"
import load from "./load"

export default combineReducers({
    error:error,
    nota:nota,
    load:load
})

