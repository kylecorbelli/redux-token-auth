import {
  ReduxState
} from './types'

const initialState: ReduxState = {
  currentUser: {
    isLoggedIn: false,
    isLoading: false,
    attributes: {},
  },
}

export default initialState
