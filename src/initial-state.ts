import {
  ReduxTokenAuthState
} from './types'

const initialState: ReduxTokenAuthState = {
  currentUser: {
    isSignedIn: false,
    isSubmittingRequest: false,
    isLoading: false,
    hasVerificationBeenAttempted: false,
    attributes: {},
    submissionError: ''
  },
}

export default initialState
