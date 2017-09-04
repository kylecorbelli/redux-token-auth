import axios from 'axios'
import { Dispatch } from 'redux'
import {
  AuthResponse,
  VerificationParams,
  UserAttributes,
  UserRegistrationDetails,
  UserSignInCredentials,
  UserSignOutCredentials,
  ActionsExport,
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
  RegistrationRequestSentAction,
  RegistrationRequestSucceededAction,
  RegistrationRequestFailedAction,
  VerifyTokenRequestSentAction,
  VerifyTokenRequestSucceededAction,
  VerifyTokenRequestFailedAction,
  SignInRequestSentAction,
  SignInRequestSucceededAction,
  SignInRequestFailedAction,
  SignOutRequestSentAction,
  SignOutRequestSucceededAction,
  SignOutRequestFailedAction,
} from './types'
import {
  setAuthHeaders,
  deleteAuthHeaders,
  persistAuthHeadersInLocalStorage,
  deleteAuthHeadersFromLocalStorage,
} from './services/auth' // <- maybe this is where you pass in the platform paramter, specifying if it is for a browser or for React Native

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pure Redux actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registrationRequestSent = (): RegistrationRequestSentAction => ({
  type: REGISTRATION_REQUEST_SENT,
})

export const registrationRequestSucceeded = (userAttributes: UserAttributes): RegistrationRequestSucceededAction => ({
  type: REGISTRATION_REQUEST_SUCCEEDED,
  payload: {
    userAttributes,
  },
})

export const registrationRequestFailed = (): RegistrationRequestFailedAction => ({
  type: REGISTRATION_REQUEST_FAILED,
})

export const verifyTokenRequestSent = (): VerifyTokenRequestSentAction => ({
  type: VERIFY_TOKEN_REQUEST_SENT,
})

export const verifyTokenRequestSucceeded = (userAttributes: UserAttributes): VerifyTokenRequestSucceededAction => ({
  type: VERIFY_TOKEN_REQUEST_SUCCEEDED,
  payload: {
    userAttributes,
  },
})

export const verifyTokenRequestFailed = (): VerifyTokenRequestFailedAction => ({
  type: VERIFY_TOKEN_REQUEST_FAILED,
})

export const signInRequestSent = (): SignInRequestSentAction => ({
  type: SIGNIN_REQUEST_SENT,
})

export const signInRequestSucceeded = (userAttributes: UserAttributes): SignInRequestSucceededAction => ({
  type: SIGNIN_REQUEST_SUCCEEDED,
  payload: {
    userAttributes,
  },
})

export const signInRequestFailed = (): SignInRequestFailedAction => ({
  type: SIGNIN_REQUEST_FAILED,
})

export const signOutRequestSent = (): SignOutRequestSentAction => ({
  type: SIGNOUT_REQUEST_SENT,
})

export const signOutRequestSucceeded = (): SignOutRequestSucceededAction => ({
  type: SIGNOUT_REQUEST_SUCCEEDED,
})

export const signOutRequestFailed = (): SignOutRequestFailedAction => ({
  type: SIGNOUT_REQUEST_FAILED,
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Async Redux Thunk actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// what is the second argument here? it needs to contain configs for (1) userRegistrationDetails, (2) userAttributes, (3) maybe even the authUrl... just make it a simple one-argument function
// we'll also want the userAttributes to pertain to the end-user's initial state and heaven forbid reducers
// actually, userSignInCredentials, userSignOutCredentials, and verificationParams are always the same as per devise token auth
// const config = {
//   authUrl: 'http://url.com',
//   userAttributes: {
//     firstName: 'name' // <- key is how the frontend knows it, value is how the backend knows it
//   },
//   userRegistrationAttributes: { <- this is for keys/vals IN ADDITION TO email, password and passwordConfirmation
//     firstName: 'name'
//   },
// }

// extract this service somewhere:
const invertHash = (hash: { [key: string]: any }) => {
  const newHash = {}
  for (let key in hash) {
    const val = hash[key]
    newHash[val] = key
  }
  return newHash
}

const generateAuthActions = (config: { [key: string]: any }): ActionsExport => {
  const {
    authUrl,
    userAttributes,
    userRegistrationAttributes,
  } = config

  const registerUser = (
    userRegistrationDetails: UserRegistrationDetails,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(registrationRequestSent())
    const {
      email,
      password,
      passwordConfirmation,
    } = userRegistrationDetails
    const data = {
      email,
      password,
      password_confirmation: passwordConfirmation,
    }
    Object.keys(userRegistrationAttributes).forEach((key: string) => {
      const backendKey = userRegistrationAttributes[key]
      data[backendKey] = userRegistrationDetails[key]
    })
    try {
      const response: AuthResponse = await axios({
        method: 'POST',
        url: authUrl,
        data,
      })
      setAuthHeaders(response.headers)
      // Have to check what type of platform it is, depending on the key provided by the end-user... like "browser", "iphone", or "android", etc.:
      persistAuthHeadersInLocalStorage(response.headers)
      // Gonna need to refer to the passed-in User model configuration from the package user
      // const userAttributes: UserAttributes = {
      //   firstName,
      // }
      const invertedUserAttributes = invertHash(userAttributes)
      const userAttributesBackendKeys = Object.keys(invertedUserAttributes)
      const userAttributesToSave = {}
      Object.keys(response.data.data).forEach((key: string) => {
        if (userAttributesBackendKeys.indexOf(key) !== -1) {
          userAttributesToSave[invertedUserAttributes[key]] = response.data.data[key]
        }
      })
      console.log('userAttributesToSave')
      console.log(userAttributesToSave)
      dispatch(registrationRequestSucceeded(userAttributesToSave)) // <- need to make this reducer more flexible
    } catch (error) {
      dispatch(registrationRequestFailed())
      throw error
    }
  }

  const verifyToken = (
    verificationParams: VerificationParams,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(verifyTokenRequestSent())
    try {
      const response = await axios({
        method: 'GET',
        url: `${authUrl}/validate_token`,
        params: verificationParams,
      })
      const { name } = response.data.data
      setAuthHeaders(response.headers)
      persistAuthHeadersInLocalStorage(response.headers)
      // Gonna need to refer to the passed-in User model configuration from the package user
      const userAttributes: UserAttributes = {
        firstName: name,
      }
      dispatch(verifyTokenRequestSucceeded(userAttributes))
    } catch (error) {
      dispatch(verifyTokenRequestFailed())
    }
  }

  const signInUser = (
    userSignInCredentials: UserSignInCredentials,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(signInRequestSent())
    const {
      email,
      password,
    } = userSignInCredentials
    try {
      const response = await axios({
        method: 'POST',
        url: `${authUrl}/sign_in`,
        data: {
          email,
          password,
        },
      })
      setAuthHeaders(response.headers)
      persistAuthHeadersInLocalStorage(response.headers)
      // Gonna need to refer to the passed-in User model configuration from the package user
      const { name } = response.data.data
      const userAttributes: UserAttributes = {
        firstName: name,
      }
      dispatch(signInRequestSucceeded(userAttributes))
    } catch (error) {
      dispatch(signInRequestFailed())
      throw error
    }
  }

  const signOutUser = (
    userSignOutCredentials: UserSignOutCredentials,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(signOutRequestSent())
    try {
      await axios({
        method: 'DELETE',
        url: `${authUrl}/sign_out`,
        data: userSignOutCredentials,
      })
      deleteAuthHeaders()
      deleteAuthHeadersFromLocalStorage()
      dispatch(signOutRequestSucceeded())
    } catch (error) {
      dispatch(signOutRequestFailed())
      throw error
    }
  }

  return {
    registerUser,
    verifyToken,
    signInUser,
    signOutUser,
  }
}

export default generateAuthActions
