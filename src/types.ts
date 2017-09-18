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

export interface UserRegistrationDetails {
  readonly email: string
  readonly password: string
  readonly passwordConfirmation: string
  readonly [key: string]: any
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

export type ReduxAsyncAction = (input?: any) => (dispatch: Dispatch<{}>) => Promise<void>

export type VerifyCredentialsFunction = (store: Store<{}>) => void

export interface ActionsExport {
  readonly registerUser: ReduxAsyncAction
  readonly verifyToken: ReduxAsyncAction
  readonly signInUser: ReduxAsyncAction
  readonly signOutUser: ReduxAsyncAction
  readonly verifyCredentials: VerifyCredentialsFunction
}

export type ActionsGeneratorExport = (config: { [key: string]: any }) => ActionsExport

export interface SingleLayerStringMap {
  [key: string]: string
}

export interface GenerateRequireSignInWrapperConfig {
  readonly redirectPathIfNotSignedIn: string
}

export type RequireSignInWrapper = (PageComponent: ComponentClass) => ComponentClass
