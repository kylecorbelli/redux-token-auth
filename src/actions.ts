import axios from 'axios'
import {
  Dispatch,
  Store,
} from 'redux'
import {
  AuthResponse,
  DeviceStorage,
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
  SET_HAS_VERIFICATION_BEEN_ATTEMPTED,
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
  SetHasVerificationBeenAttemptedAction,
} from './types'
import AsyncLocalStorage from './AsyncLocalStorage'
import {
  deleteAuthHeaders,
  deleteAuthHeadersFromDeviceStorage,
  getUserAttributesFromResponse,
  persistAuthHeadersInDeviceStorage,
  setAuthHeaders,
} from './services/auth'

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

export const setHasVerificationBeenAttempted = (
  hasVerificationBeenAttempted: boolean
): SetHasVerificationBeenAttemptedAction => ({
  type: SET_HAS_VERIFICATION_BEEN_ATTEMPTED,
  payload: {
    hasVerificationBeenAttempted,
  },
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Async Redux Thunk actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const generateAuthActions = (config: { [key: string]: any }): ActionsExport => {
  const {
    authUrl,
    userAttributes,
    userRegistrationAttributes,
  } = config

  const Storage: DeviceStorage = AsyncLocalStorage

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
      persistAuthHeadersInDeviceStorage(Storage, response.headers)
      const userAttributesToSave = getUserAttributesFromResponse(userAttributes, response)
      dispatch(registrationRequestSucceeded(userAttributesToSave))
    } catch (error) {
      dispatch(registrationRequestFailed())
      throw error
    }
  }

  const verifyToken = (
    verificationParams: VerificationParams,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    setAuthHeaders(verificationParams)
    dispatch(verifyTokenRequestSent())
    try {
      const response = await axios({
        method: 'GET',
        url: `${authUrl}/validate_token`,
        // params: verificationParams,
        // token in headers only, otherwise verification will fail when first-time login
      })
      setAuthHeaders(response.headers)
      // PROBLEM: access-token missing in subsequent request even though setAuthHeaders() here
      // access-token may be empty after refresh, and also empty in response.headers here
      // SOLUTION: setAuthHeaders() before verifyToken() in addition to after
      persistAuthHeadersInDeviceStorage(Storage, response.headers)
      const userAttributesToSave = getUserAttributesFromResponse(userAttributes, response)
      dispatch(verifyTokenRequestSucceeded(userAttributesToSave))
    } catch (error) {
      dispatch(verifyTokenRequestFailed())
    }
  }

  // allow any params in userSignInCredentials in addition to email and password
  const signInUser = (
    userSignInCredentials: any,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(signInRequestSent())
    try {
      const response = await axios({
        method: 'POST',
        url: `${authUrl}/sign_in`,
        data: userSignInCredentials,
      })
      setAuthHeaders(response.headers)
      persistAuthHeadersInDeviceStorage(Storage, response.headers)
      const userAttributesToSave = getUserAttributesFromResponse(userAttributes, response)
      dispatch(signInRequestSucceeded(userAttributesToSave))
    } catch (error) {
      dispatch(signInRequestFailed())
      throw error
    }
  }

  const signOutUser = () => async function (dispatch: Dispatch<{}>): Promise<void> {
    const userSignOutCredentials: UserSignOutCredentials = {
      'access-token': await Storage.getItem('access-token') as string,
      client: await Storage.getItem('client') as string,
      uid: await Storage.getItem('uid') as string,
    }
    dispatch(signOutRequestSent())
    try {
      await axios({
        method: 'DELETE',
        url: `${authUrl}/sign_out`,
        data: userSignOutCredentials,
      })
      deleteAuthHeaders()
      deleteAuthHeadersFromDeviceStorage(Storage)
      dispatch(signOutRequestSucceeded())
    } catch (error) {
      dispatch(signOutRequestFailed())
      throw error
    }
  }

  const verifyCredentials = async (store: Store<{}>): Promise<void> => {
    if (await Storage.getItem('access-token')) {
      const verificationParams: VerificationParams = {
        'access-token': await Storage.getItem('access-token') as string,
        client: await Storage.getItem('client') as string,
        uid: await Storage.getItem('uid') as string,
      }
      // because of the shit (AsyncLocalStorage in react-native)
      for (let key in verificationParams) {
        let val = verificationParams[key]
        let newVal: string
        try {
          newVal = JSON.parse(val).rawData
        } catch (e) {
          newVal = val
        }
        verificationParams[key] = newVal
      }
      store.dispatch<any>(verifyToken(verificationParams))
    } else {
      store.dispatch(setHasVerificationBeenAttempted(true))
    }
  }

  return {
    registerUser,
    verifyToken,
    signInUser,
    signOutUser,
    verifyCredentials,
  }
}

export default generateAuthActions
