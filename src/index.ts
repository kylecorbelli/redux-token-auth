import theActionsExportThatShouldBeRenamed from './actions'
import reduxTokenAuthReducer from './reducers'

export {
  theActionsExportThatShouldBeRenamed,
  reduxTokenAuthReducer,
}

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
