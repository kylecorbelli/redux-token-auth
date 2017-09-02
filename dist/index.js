"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("./actions");
exports.theActionsExportThatShouldBeRenamed = actions_1.default;
var reducers_1 = require("./reducers");
exports.reduxTokenAuthReducer = reducers_1.default;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Example of how the end-user will import the actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import {
//   generateAuthFunctions,
// } from 'redux-token-auth'
//
// const authUrl: string = 'http://www.someapp.com/auth'
// const userAttributes = {
//   firstName: 'name',
//   imageUrl: 'image_url',
// }
// const {
//   registerUser,
//   verifyToken,
//   signInUser,
//   signOutUser,
// } = generateAuthFunctions(authUrl, userAttributes)
//# sourceMappingURL=index.js.map