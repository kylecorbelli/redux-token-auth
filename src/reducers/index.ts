import {
  combineReducers,
  Reducer,
} from 'redux'
import currentUser from './current-user'

const reduxTokenAuthReducer: Reducer<{}> = combineReducers({
  currentUser,
})

export default reduxTokenAuthReducer

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
