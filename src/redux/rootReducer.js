import { combineReducers } from "redux";
import { contactReducer } from "./reducers/contactReducer";

const rootReducer = combineReducers({
  contacts: contactReducer,
});

export default rootReducer;
