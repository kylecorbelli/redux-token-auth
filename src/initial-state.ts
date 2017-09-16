import {
  ReduxState
} from './types'

const initialState: ReduxState = {
  currentUser: {
    isSignedIn: false,
    isLoading: false,
    attributes: {},
  },
}

export default initialState
