"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var current_user_1 = require("./current-user");
var reduxTokenAuthReducer = redux_1.combineReducers({
    currentUser: current_user_1.default,
});
exports.default = reduxTokenAuthReducer;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// An example of how the end-user will integrate this into their Redux store
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { combineReducers } from 'redux'
// import { reduxTokenAuthReducer } from 'redux-token-auth'
// import { myCustomReducer } from './my-custom-reducer'
//
// const rootReducer = combineReducers({
//   reduxTokenAuth: reduxTokenAuthReducer,
//   myCustomReducer,
// })
// Remember, they will have to user Redux Thunk when configuring their store
//# sourceMappingURL=index.js.map