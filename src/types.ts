import { ComponentClass } from 'react'
import {
  Dispatch,
  Store,
} from 'redux'

export interface UserAttributes {
  [key: string]: string | number | null
}

export interface User {
  readonly isSignedIn: boolean
  readonly isLoading: boolean
  readonly isSubmittingRequest: boolean
  readonly submissionError: string
  readonly hasVerificationBeenAttempted: boolean
  readonly attributes: UserAttributes
}

export interface ReduxTokenAuthState {
  readonly currentUser: User
}

export interface ReduxState {
  readonly reduxTokenAuth: ReduxTokenAuthState
}

export interface AuthHeaders {
  readonly 'access-token': string
  readonly 'token-type': string
  readonly client: string
  readonly expiry: string
  readonly uid: string
}

export interface AuthResponse {
  readonly headers: AuthHeaders
  readonly data: {
    readonly data: { [key: string]: any }
  }
}

export interface VerificationParams {
  readonly uid: string
  readonly client: string
  readonly 'access-token': string
}

export type REGISTRATION_REQUEST_SENT = 'redux-token-auth/REGISTRATION_REQUEST_SENT'
export const REGISTRATION_REQUEST_SENT: REGISTRATION_REQUEST_SENT = 'redux-token-auth/REGISTRATION_REQUEST_SENT'

export type REGISTRATION_REQUEST_SUCCEEDED = 'redux-token-auth/REGISTRATION_REQUEST_SUCCEEDED'
export const REGISTRATION_REQUEST_SUCCEEDED: REGISTRATION_REQUEST_SUCCEEDED = 'redux-token-auth/REGISTRATION_REQUEST_SUCCEEDED'

export type REGISTRATION_REQUEST_FAILED = 'redux-token-auth/REGISTRATION_REQUEST_FAILED'
export const REGISTRATION_REQUEST_FAILED: REGISTRATION_REQUEST_FAILED = 'redux-token-auth/REGISTRATION_REQUEST_FAILED'

export type VERIFY_TOKEN_REQUEST_SENT = 'redux-token-auth/VERIFY_TOKEN_REQUEST_SENT'
export const VERIFY_TOKEN_REQUEST_SENT: VERIFY_TOKEN_REQUEST_SENT = 'redux-token-auth/VERIFY_TOKEN_REQUEST_SENT'

export type VERIFY_TOKEN_REQUEST_SUCCEEDED = 'redux-token-auth/VERIFY_TOKEN_REQUEST_SUCCEEDED'
export const VERIFY_TOKEN_REQUEST_SUCCEEDED: VERIFY_TOKEN_REQUEST_SUCCEEDED = 'redux-token-auth/VERIFY_TOKEN_REQUEST_SUCCEEDED'

export type VERIFY_TOKEN_REQUEST_FAILED = 'redux-token-auth/VERIFY_TOKEN_REQUEST_FAILED'
export const VERIFY_TOKEN_REQUEST_FAILED: VERIFY_TOKEN_REQUEST_FAILED = 'redux-token-auth/VERIFY_TOKEN_REQUEST_FAILED'

export type SIGNIN_REQUEST_SENT = 'redux-token-auth/SIGNIN_REQUEST_SENT'
export const SIGNIN_REQUEST_SENT: SIGNIN_REQUEST_SENT = 'redux-token-auth/SIGNIN_REQUEST_SENT'

export type SIGNIN_REQUEST_SUCCEEDED = 'redux-token-auth/SIGNIN_REQUEST_SUCCEEDED'
export const SIGNIN_REQUEST_SUCCEEDED: SIGNIN_REQUEST_SUCCEEDED = 'redux-token-auth/SIGNIN_REQUEST_SUCCEEDED'

export type SIGNIN_REQUEST_FAILED = 'redux-token-auth/SIGNIN_REQUEST_FAILED'
export const SIGNIN_REQUEST_FAILED: SIGNIN_REQUEST_FAILED = 'redux-token-auth/SIGNIN_REQUEST_FAILED'

export type SIGNOUT_REQUEST_SENT = 'redux-token-auth/SIGNOUT_REQUEST_SENT'
export const SIGNOUT_REQUEST_SENT: SIGNOUT_REQUEST_SENT = 'redux-token-auth/SIGNOUT_REQUEST_SENT'

export type SIGNOUT_REQUEST_SUCCEEDED = 'redux-token-auth/SIGNOUT_REQUEST_SUCCEEDED'
export const SIGNOUT_REQUEST_SUCCEEDED: SIGNOUT_REQUEST_SUCCEEDED = 'redux-token-auth/SIGNOUT_REQUEST_SUCCEEDED'

export type SIGNOUT_REQUEST_FAILED = 'redux-token-auth/SIGNOUT_REQUEST_FAILED'
export const SIGNOUT_REQUEST_FAILED: SIGNOUT_REQUEST_FAILED = 'redux-token-auth/SIGNOUT_REQUEST_FAILED'

export type SET_HAS_VERIFICATION_BEEN_ATTEMPTED = 'redux-token-auth/SET_HAS_VERIFICATION_BEEN_ATTEMPTED'
export const SET_HAS_VERIFICATION_BEEN_ATTEMPTED: SET_HAS_VERIFICATION_BEEN_ATTEMPTED = 'redux-token-auth/SET_HAS_VERIFICATION_BEEN_ATTEMPTED'

export type RESET_PASSWORD_REQUEST_SENT = 'redux-token-auth/RESET_PASSWORD_REQUEST_SENT'
export const RESET_PASSWORD_REQUEST_SENT: RESET_PASSWORD_REQUEST_SENT = 'redux-token-auth/RESET_PASSWORD_REQUEST_SENT'

export type RESET_PASSWORD_REQUEST_SUCCEEDED = 'redux-token-auth/RESET_PASSWORD_REQUEST_SUCCEEDED'
export const RESET_PASSWORD_REQUEST_SUCCEEDED: RESET_PASSWORD_REQUEST_SUCCEEDED = 'redux-token-auth/RESET_PASSWORD_REQUEST_SUCCEEDED'

export type RESET_PASSWORD_REQUEST_FAILED = 'redux-token-auth/RESET_PASSWORD_REQUEST_FAILED'
export const RESET_PASSWORD_REQUEST_FAILED: RESET_PASSWORD_REQUEST_FAILED = 'redux-token-auth/RESET_PASSWORD_REQUEST_FAILED'

export type RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT = 'redux-token-auth/RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT'
export const RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT: RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT = 'redux-token-auth/RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT'
export type RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED = 'redux-token-auth/  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED'
export const   RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED:   RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED = 'redux-token-auth/  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED'
export type RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED = 'redux-token-auth/  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED'
export const   RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED:   RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED = 'redux-token-auth/  RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED'

export type CHANGE_PASSWORD_SENT = 'redux-token-auth/CHANGE_PASSWORD_SENT'
export const CHANGE_PASSWORD_SENT: CHANGE_PASSWORD_SENT = 'redux-token-auth/CHANGE_PASSWORD_SENT'
export type CHANGE_PASSWORD_SUCCEEDED = 'redux-token-auth/CHANGE_PASSWORD_SUCCEEDED'
export const CHANGE_PASSWORD_SUCCEEDED: CHANGE_PASSWORD_SUCCEEDED = 'redux-token-auth/CHANGE_PASSWORD_SUCCEEDED'
export type CHANGE_PASSWORD_FAILED = 'redux-token-auth/CHANGE_PASSWORD_FAILED'
export const CHANGE_PASSWORD_FAILED: CHANGE_PASSWORD_FAILED = 'redux-token-auth/CHANGE_PASSWORD_FAILED'


export interface UserRegistrationDetails {
  readonly email: string
  readonly password: string
  readonly passwordConfirmation: string
  readonly [key: string]: any
}

export interface NewPassword {
  readonly password: string
  readonly passwordConfirmation: string
}

export interface UserSignInCredentials {
  readonly email: string
  readonly password: string
}

export interface UserSignOutCredentials {
  readonly 'access-token': string
  readonly client: string
  readonly uid: string
}

export interface UserPasswordResetDetails {
  readonly email: string
  readonly url: string
}

export interface UserPasswordResetTempLoginDetails {
  readonly uid: string
  readonly accessToken: string
  readonly client: string
}

export interface RegistrationRequestSentAction {
  readonly type: REGISTRATION_REQUEST_SENT
}

export interface RegistrationRequestSucceededAction {
  readonly type: REGISTRATION_REQUEST_SUCCEEDED
  readonly payload: {
    readonly userAttributes: UserAttributes
  }
}

export interface RegistrationRequestFailedAction {
  readonly type: REGISTRATION_REQUEST_FAILED
}

export interface VerifyTokenRequestSentAction {
  readonly type: VERIFY_TOKEN_REQUEST_SENT
}

export interface VerifyTokenRequestSucceededAction {
  readonly type: VERIFY_TOKEN_REQUEST_SUCCEEDED
  readonly payload: {
    readonly userAttributes: UserAttributes
  }
}

export interface VerifyTokenRequestFailedAction {
  readonly type: VERIFY_TOKEN_REQUEST_FAILED
}

export interface SignInRequestSentAction {
  readonly type: SIGNIN_REQUEST_SENT
}

export interface SignInRequestSucceededAction {
  readonly type: SIGNIN_REQUEST_SUCCEEDED
  readonly payload: {
    readonly userAttributes: UserAttributes
  }
}

export interface SignInRequestFailedAction {
  readonly type: SIGNIN_REQUEST_FAILED
}

export interface SignOutRequestSentAction {
  readonly type: SIGNOUT_REQUEST_SENT
}

export interface SignOutRequestSucceededAction {
  readonly type: SIGNOUT_REQUEST_SUCCEEDED
}

export interface SignOutRequestFailedAction {
  readonly type: SIGNOUT_REQUEST_FAILED
}

export interface SetHasVerificationBeenAttemptedAction {
  readonly type: SET_HAS_VERIFICATION_BEEN_ATTEMPTED
  readonly payload: {
    readonly hasVerificationBeenAttempted: boolean
  }
}

export interface ChangePasswordSentAction {
  readonly type: CHANGE_PASSWORD_SENT
}

export interface ChangePasswordSucceededAction {
  readonly type: CHANGE_PASSWORD_SUCCEEDED
}

export interface ChangePasswordFailedAction {
  readonly type: CHANGE_PASSWORD_FAILED
  readonly payload: {
    readonly errorMessage: string
  }
}

export interface ResetPasswordRequestSentAction {
  readonly type: RESET_PASSWORD_REQUEST_SENT
}

export interface ResetPasswordRequestSucceededAction {
  readonly type: RESET_PASSWORD_REQUEST_SUCCEEDED
}

export interface ResetPasswordRequestFailedAction {
  readonly type: RESET_PASSWORD_REQUEST_FAILED
}

export interface ResetPasswordTempSigninRequestSentAction {
  readonly type: RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SENT
}

export interface ResetPasswordTempSigninRequestSucceededAction {
  readonly type: RESET_PASSWORD_TEMP_SIGNIN_REQUEST_SUCCEEDED
}

export interface ResetPasswordTempSigninRequestFailedAction {
  readonly type: RESET_PASSWORD_TEMP_SIGNIN_REQUEST_FAILED
}

export type ReduxAction = RegistrationRequestSentAction
  | RegistrationRequestSucceededAction
  | RegistrationRequestFailedAction
  | VerifyTokenRequestSentAction
  | VerifyTokenRequestSucceededAction
  | VerifyTokenRequestFailedAction
  | SignInRequestSentAction
  | SignInRequestSucceededAction
  | SignInRequestFailedAction
  | SignOutRequestSentAction
  | SignOutRequestSucceededAction
  | SignOutRequestFailedAction
  | SetHasVerificationBeenAttemptedAction
  | ResetPasswordRequestSentAction
  | ResetPasswordRequestSucceededAction
  | ResetPasswordRequestFailedAction
  | ResetPasswordTempSigninRequestSentAction
  | ResetPasswordTempSigninRequestSucceededAction
  | ResetPasswordTempSigninRequestFailedAction
  | ChangePasswordSentAction
  | ChangePasswordSucceededAction
  | ChangePasswordFailedAction

export type ReduxAsyncAction = (input?: any) => (dispatch: Dispatch<{}>) => Promise<void>

export type VerifyCredentialsFunction = (store: Store<{}>) => void

export interface ActionsExport {
  readonly registerUser: ReduxAsyncAction
  readonly verifyToken: ReduxAsyncAction
  readonly signInUser: ReduxAsyncAction
  readonly signOutUser: ReduxAsyncAction
  readonly verifyCredentials: VerifyCredentialsFunction
  readonly resetPassword: ReduxAsyncAction
  readonly resetPasswordTempSignin: ReduxAsyncAction
  readonly changePassword: ReduxAsyncAction
}

export type ActionsGeneratorExport = (config: { [key: string]: any }) => ActionsExport

export interface SingleLayerStringMap {
  [key: string]: string
}

export interface GenerateRequireSignInWrapperConfig {
  readonly redirectPathIfNotSignedIn: string
}

export type RequireSignInWrapper = (PageComponent: ComponentClass) => ComponentClass

export interface DeviceStorage {
  readonly getItem: (key: string) => Promise<any>
  readonly setItem: (key: string, value: string) => Promise<any>
  readonly removeItem: (key: string) => Promise<any>
  readonly clear: () => Promise<any>
  readonly getAllKeys: () => Promise<any>
  readonly multiGet: (keys: string[]) => Promise<any>
  readonly multiSet: (keyValuePairs: string[][]) => Promise<any>
}
