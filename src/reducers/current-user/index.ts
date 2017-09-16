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
} from '../../types'
import initialState from '../../initial-state'

const {
  currentUser: initialUser,
} = initialState

const currentUser = (state: User = initialUser, action: ReduxAction): User => {
  switch (action.type) {
    case REGISTRATION_REQUEST_SENT:
    case VERIFY_TOKEN_REQUEST_SENT:
    case SIGNIN_REQUEST_SENT:
    case SIGNOUT_REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
      }
    case REGISTRATION_REQUEST_SUCCEEDED:
    case VERIFY_TOKEN_REQUEST_SUCCEEDED:
    case SIGNIN_REQUEST_SUCCEEDED:
      const { userAttributes } = action.payload
      return {
        ...state,
        attributes: { ...userAttributes },
        isLoading: false,
        isSignedIn: true,
      }
    case REGISTRATION_REQUEST_FAILED:
    case VERIFY_TOKEN_REQUEST_FAILED:
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
    case SIGNOUT_REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state
  }
}

export default currentUser
