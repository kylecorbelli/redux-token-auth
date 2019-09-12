import axios from 'axios'
import {
  Dispatch,
  Store,
} from 'redux'
import {
  AuthResponse,
  AuthHeaders,
  DeviceStorage,
  VerificationParams,
  UserAttributes,
  UserRegistrationDetails,
  UserSignInCredentials,
  UserSignOutCredentials,
  UserPasswordResetDetails,
  NewPassword,
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
  RESET_PASSWORD_REQUEST_SENT,
  RESET_PASSWORD_REQUEST_SUCCEEDED,
  RESET_PASSWORD_REQUEST_FAILED,
  CHANGE_PASSWORD_SENT,
  CHANGE_PASSWORD_SUCCEEDED,
  CHANGE_PASSWORD_FAILED,
  ChangePasswordSentAction,
  ChangePasswordFailedAction,
  ChangePasswordSucceededAction,
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
  ResetPasswordRequestSentAction,
  ResetPasswordRequestSucceededAction,
  ResetPasswordRequestFailedAction,
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

export const resetPasswordRequestSent = (): ResetPasswordRequestSentAction => ({
  type: RESET_PASSWORD_REQUEST_SENT,
})

export const resetPasswordRequestSucceeded = (): ResetPasswordRequestSucceededAction => ({
  type: RESET_PASSWORD_REQUEST_SUCCEEDED,
})

export const resetPasswordRequestFailed = (): ResetPasswordRequestFailedAction => ({
  type: RESET_PASSWORD_REQUEST_FAILED,
})

export const changePasswordSent = (): ChangePasswordSentAction => ({
  type: CHANGE_PASSWORD_SENT,
})

export const changePasswordSucceeded = (): ChangePasswordSucceededAction => ({
  type: CHANGE_PASSWORD_SUCCEEDED,
})

export const changePasswordFailed = (errorMessage: string): ChangePasswordFailedAction => ({
  type: CHANGE_PASSWORD_FAILED,
  payload: {
    errorMessage
  }
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Async Redux Thunk actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const generateAuthActions = (config: { [key: string]: any }): ActionsExport => {
  const {
    authUrl,
    storage,
    userAttributes,
    userRegistrationAttributes,
  } = config

  const Storage: DeviceStorage = Boolean(storage.flushGetRequests) ? storage : AsyncLocalStorage

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

  const changePassword = (
    newPassword: NewPassword,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(changePasswordSent());
    
    const {
      password,
      passwordConfirmation
    } = newPassword;
    const authToken: VerificationParams = {
      'access-token': await Storage.getItem('access-token') as string,
      client: await Storage.getItem('client') as string,
      uid: await Storage.getItem('uid') as string,
    }
    
    if (password === '') {
      dispatch(changePasswordFailed('Password cannot be blank'));
    }
    else if (password !== passwordConfirmation) {
      dispatch(changePasswordFailed('Passwords are not the same'));
    }
    else if (authToken){
      const data = {
        password: password,
        'password_confirmation': passwordConfirmation
      }
      try {
        const response: AuthResponse = await axios({
          method: 'PUT',
          url: `${authUrl}/password`,
          data: data,
          headers: authToken
        })
        if (response.data['success'] === true) {
          dispatch(changePasswordSucceeded())
        }
        else {
          const errorMessages: string[] = response.data['errors']
          const errorMessage: string = errorMessages.toString()
          dispatch(changePasswordFailed(errorMessage))
        }
      } catch (error) {
        console.log(error)
      }
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
      setAuthHeaders(response.headers)
      persistAuthHeadersInDeviceStorage(Storage, response.headers)
      const userAttributesToSave = getUserAttributesFromResponse(userAttributes, response)
      dispatch(verifyTokenRequestSucceeded(userAttributesToSave))
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
      persistAuthHeadersInDeviceStorage(Storage, response.headers)
      const userAttributesToSave = getUserAttributesFromResponse(userAttributes, response)
      dispatch(signInRequestSucceeded(userAttributesToSave))
    } catch (error) {
      dispatch(signInRequestFailed())
      throw error
    }
  }

  const resetPasswordTempSignin = (
    authHeaders: AuthHeaders,
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(resetPasswordRequestSent())
    setAuthHeaders(authHeaders)
    persistAuthHeadersInDeviceStorage(Storage, authHeaders)
    dispatch(resetPasswordRequestSucceeded())
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
      store.dispatch<any>(verifyToken(verificationParams))
    } else {
      store.dispatch(setHasVerificationBeenAttempted(true))
    }
  }

  const resetPassword = (
    UserPasswordResetDetails: UserPasswordResetDetails
  ) => async function (dispatch: Dispatch<{}>): Promise<void> {
    dispatch(resetPasswordRequestSent())
    const  {email, url} = UserPasswordResetDetails
    const data = {
      email: email,
      'redirect_url': url,
    }
    try {
      const response: AuthResponse = await axios({
        method: 'POST',
        url: `${authUrl}/password`,
        data
      })
      console.log(response)
      dispatch(resetPasswordRequestSucceeded())
    } catch (error) {
      dispatch(resetPasswordRequestFailed())
    }
  }

  return {
    registerUser,
    verifyToken,
    signInUser,
    signOutUser,
    verifyCredentials,
    resetPassword,
    resetPasswordTempSignin,
    changePassword,
  }
}

export default generateAuthActions