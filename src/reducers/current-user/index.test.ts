import currentUser from './index'
import {
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
  User,
  UserAttributes,
} from '../../types'
import {
  registrationRequestSent,
  registrationRequestSucceeded,
  registrationRequestFailed,
  verifyTokenRequestSent,
  verifyTokenRequestSucceeded,
  verifyTokenRequestFailed,
  signInRequestSent,
  signInRequestSucceeded,
  signInRequestFailed,
  signOutRequestSent,
  signOutRequestSucceeded,
  signOutRequestFailed,
} from '../../actions'

describe('currentUser', () => {
  const alreadyLoadingState: User = {
    attributes: {
      firstName: null,
    },
    isLoading: true,
    isSignedIn: false,
  }

  const loggedInUser: User = {
    attributes: {
      firstName: 'Snowball',
      imageUrl: 'http://some.url',
    },
    isLoading: false,
    isSignedIn: true,
  }

  const loggedInUserWithRequestAlreadySent: User = {
    ...loggedInUser,
    isLoading: true,
  }

  describe('REGISTRATION_REQUEST_SENT', () => {
    it('indicates that the current user is loading', () => {
      const action: RegistrationRequestSentAction = registrationRequestSent()
      const newState: User = currentUser(undefined, action)
      expect(newState.isLoading).toBe(true)
    })
  })

  describe('REGISTRATION_REQUEST_SUCCEEDED', () => {
    it('sets the current user and indicates that it is no longer loading and is logged in', () => {
      const newUserAttributes: UserAttributes = {
        firstName: 'Rick',
      }
      const action: RegistrationRequestSucceededAction = registrationRequestSucceeded(newUserAttributes)
      const newState: User = currentUser(alreadyLoadingState, action)
      const expectedNewState: User = {
        attributes: newUserAttributes,
        isLoading: false,
        isSignedIn: true,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('REGISTRATION_REQUEST_FAILED', () => {
    it('indicates that the current user is no longer loading', () => {
      const action: RegistrationRequestFailedAction = registrationRequestFailed()
      const newState: User = currentUser(alreadyLoadingState, action)
      expect(newState.isLoading).toBe(false)
    })
  })

  describe('VERIFY_TOKEN_REQUEST_SENT', () => {
    it('indicates that the current user is loading', () => {
      const action: VerifyTokenRequestSentAction = verifyTokenRequestSent()
      const newState: User = currentUser(undefined, action)
      expect(newState.isLoading).toBe(true)
    })
  })

  describe('VERIFY_TOKEN_REQUEST_SUCCEEDED', () => {
    it('sets the current user and indicates that it is no longer loading and is logged in', () => {
      const newUserAttributes: UserAttributes = {
        firstName: 'Morty',
      }
      const action: VerifyTokenRequestSucceededAction = verifyTokenRequestSucceeded(newUserAttributes)
      const newState: User = currentUser(alreadyLoadingState, action)
      const expectedNewState: User = {
        attributes: newUserAttributes,
        isLoading: false,
        isSignedIn: true,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('VERIFY_TOKEN_REQUEST_FAILED', () => {
    it('indicates that the current user is no longer loading and is not logged in', () => {
      const loggedInState: User = {
        ...alreadyLoadingState,
        isSignedIn: true,
      }
      const action: VerifyTokenRequestFailedAction = verifyTokenRequestFailed()
      const newState: User = currentUser(loggedInState, action)
      expect(newState.isLoading).toBe(false)
      expect(newState.isSignedIn).toBe(false)
    })
  })

  describe('SIGNIN_REQUEST_SENT', () => {
    it('indicates that the current user is loading', () => {
      const action: SignInRequestSentAction = signInRequestSent()
      const newState: User = currentUser(undefined, action)
      expect(newState.isLoading).toBe(true)
    })
  })

  describe('SIGNIN_REQUEST_SUCCEEDED', () => {
    it('sets the current user and indicates that it is no longer loading and is logged in', () => {
      const newUserAttributes: UserAttributes = {
        firstName: 'Rick',
      }
      const action: SignInRequestSucceededAction = signInRequestSucceeded(newUserAttributes)
      const newState: User = currentUser(alreadyLoadingState, action)
      const expectedNewState: User = {
        attributes: newUserAttributes,
        isLoading: false,
        isSignedIn: true,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('SIGNIN_REQUEST_FAILED', () => {
    it('indicates that the current user is no longer loading and is not logged in', () => {
      const action: SignInRequestFailedAction = signInRequestFailed()
      const newState: User = currentUser(alreadyLoadingState, action)
      expect(newState.isLoading).toBe(false)
      expect(newState.isSignedIn).toBe(false)
    })
  })

  describe('SIGNOUT_REQUEST_SENT', () => {
    it('indicates that the current user is loading', () => {
      const action: SignOutRequestSentAction = signOutRequestSent()
      const newState: User = currentUser(loggedInUser, action)
      expect(newState.isLoading).toBe(true)
    })
  })

  describe('SIGNOUT_REQUEST_SUCCEEDED', () => {
    it('indicates that the current user is not loading, is logged out, and has empty attributes', () => {
      const action: SignOutRequestSucceededAction = signOutRequestSucceeded()
      const newState: User = currentUser(loggedInUserWithRequestAlreadySent, action)
      const expectedNewState: User = {
        attributes: {
          firstName: null,
          imageUrl: null,
        },
        isLoading: false,
        isSignedIn: false,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })

  describe('SIGNOUT_REQUEST_FAILED', () => {
    it('indicates that the user is not loading but is stilled logged in', () => {
      const action: SignOutRequestFailedAction = signOutRequestFailed()
      const newState: User = currentUser(loggedInUserWithRequestAlreadySent, action)
      const expectedNewState: User = {
        ...loggedInUserWithRequestAlreadySent,
        isLoading: false,
      }
      expect(newState).toEqual(expectedNewState)
    })
  })
})
