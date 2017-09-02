import axios from 'axios'
// import { authUrl } from '../../constants' // this has to be passed in by the package user
import { Dispatch } from 'redux'
import {
  AuthResponse,
  VerificationParams,
  UserAttributes,
  UserRegistrationDetails,
  UserSignInCredentials,
  UserSignOutCredentials,
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

// Maybe type this even:
const theActionsExportThatShouldBeRenamed = (authUrl: string) => {
  const registerUser = (
    userRegistrationDetails: UserRegistrationDetails,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(registrationRequestSent())
    const {
      firstName,
      email,
      password,
      passwordConfirmation,
    } = userRegistrationDetails
    try {
      const response: AuthResponse = await axios({
        method: 'POST',
        url: authUrl,
        data: {
          email,
          name: firstName, // even this is tricky because it requires the user's devise configuration to allow the "name" attribute
          password,
          password_confirmation: passwordConfirmation,
        },
      })
      setAuthHeaders(response.headers)
      persistAuthHeadersInLocalStorage(response.headers)
      // Gonna need to refer to the passed-in User model configuration from the package user
      const userAttributes: UserAttributes = {
        firstName,
      }
      dispatch(registrationRequestSucceeded(userAttributes))
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

export default theActionsExportThatShouldBeRenamed
