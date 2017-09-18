import {
  ReduxTokenAuthState
} from './types'

const initialState: ReduxTokenAuthState = {
  currentUser: {
    isSignedIn: false,
    isLoading: false,
    attributes: {},
  },
}

export default initialState
