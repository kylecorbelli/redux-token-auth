import {
  User,
  UserAttributes,
  ReduxAction,
  REGISTRATION_REQUEST_SENT,
  REGISTRATION_REQUEST_SUCCEEDED,
  REGISTRATION_REQUEST_FAILED,
  VERIFY_TOKEN_REQUEST_SENT,
  VERIFY_TOKEN_REQUEST_SUCCEEDED,
  VERIFY_TOKEN_REQUEST_FAILED,
  SIGNIN_REQUEST_SENT,
  SIGNIN_REQUEST_SUCCEEDED,
  SIGNIN_REQUEST_FAILED,
  SIGNOUT_REQUEST_SENT,
  SIGNOUT_REQUEST_SUCCEEDED,
  SIGNOUT_REQUEST_FAILED,
  SET_HAS_VERIFICATION_BEEN_ATTEMPTED,
  RESET_PASSWORD_REQUEST_SENT,
  RESET_PASSWORD_REQUEST_SUCCEEDED,
  RESET_PASSWORD_REQUEST_FAILED,
  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT,
  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED,
  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED,
  CHANGE_PASSWORD_SENT,
  CHANGE_PASSWORD_SUCCEEDED,
  CHANGE_PASSWORD_FAILED,
} from '../../types'
import initialState from '../../initial-state'

const {
  currentUser: initialUser,
} = initialState

const currentUser = (state: User = initialUser, action: ReduxAction): User => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST_SENT:
    case RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT:
      return {
        ...state,
        isSubmittingRequest: true,
      }
    case REGISTRATION_REQUEST_SENT:
    case VERIFY_TOKEN_REQUEST_SENT:
    case SIGNIN_REQUEST_SENT:
    case SIGNOUT_REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      }
    case VERIFY_TOKEN_REQUEST_SUCCEEDED:
      return {
        ...state,
        attributes: { ...action.payload.userAttributes },
        isLoading: false,
        isSignedIn: true,
        hasVerificationBeenAttempted: true,
      }
    case REGISTRATION_REQUEST_SUCCEEDED:
    case SIGNIN_REQUEST_SUCCEEDED:
      return {
        ...state,
        attributes: { ...action.payload.userAttributes },
        isLoading: false,
        isSignedIn: true,
      }
    case VERIFY_TOKEN_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        hasVerificationBeenAttempted: true,
      }
    case REGISTRATION_REQUEST_FAILED:
    case SIGNIN_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
      }
    case SIGNOUT_REQUEST_SUCCEEDED:
      const userAttributeKeys: string[] = Object.keys(state.attributes)
      const allNullUserAttributes: UserAttributes = userAttributeKeys.reduce(
        (accumulatedNullUserAttributes: UserAttributes, currentUserAttributeKey: string): UserAttributes => {
          return {
            ...accumulatedNullUserAttributes,
            [currentUserAttributeKey]: null,
          }
        },
        {},
      )
      return {
        ...state,
        attributes: allNullUserAttributes,
        isLoading: false,
        isSignedIn: false,
      }
    case RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED:
    case SIGNOUT_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    case SET_HAS_VERIFICATION_BEEN_ATTEMPTED:
      return {
        ...state,
        hasVerificationBeenAttempted: action.payload.hasVerificationBeenAttempted,
      }
    case RESET_PASSWORD_REQUEST_FAILED:
      return {
        ...state,
        isSubmittingRequest: false,
        submissionError: "Reset Password Failed"
      }
    case RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true
      }
    case RESET_PASSWORD_REQUEST_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
      }
    
    case CHANGE_PASSWORD_SENT:
      return {
        ...state,
        isSubmittingRequest: true,
        submissionError: '',
      }
    case CHANGE_PASSWORD_SUCCEEDED:
      return {
        ...state,
        isSubmittingRequest: false,
        submissionError: '',
      }
    case CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        isSubmittingRequest: false,
        submissionError: action.payload.errorMessage
      }
    default:
      return {
        ...state
      }
  }
}

export default currentUser;
