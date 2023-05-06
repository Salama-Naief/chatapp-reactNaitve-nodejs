import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import conversationReducer from "./coversation";

const rootReducer = combineReducers({
  user: userReducer,
  conversation: conversationReducer,
});

export default rootReducer;
