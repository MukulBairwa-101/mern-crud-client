import usersReducer from "./Reducers/Reducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    usersReducer
});

export default rootReducer;