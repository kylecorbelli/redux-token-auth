import axios from 'axios'
import { invertMapKeysAndValues } from './utility'
import {
  AuthHeaders,
  AuthResponse,
  SingleLayerStringMap,
} from '../types'

const authHeaderKeys: Array<string> = [
  'access-token',
  'token-type',
  'client',
  'expiry',
  'uid',
]

export const setAuthHeaders = (headers: AuthHeaders): void => {
  authHeaderKeys.forEach((key: string) => {
    axios.defaults.headers.common[key] = headers[key]
  })
}

// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
export const persistAuthHeadersInLocalStorage = (headers: AuthHeaders): void => {
  authHeaderKeys.forEach((key: string) => {
    localStorage.setItem(key, headers[key])
  })
}

export const deleteAuthHeaders = (): void => {
  authHeaderKeys.forEach((key: string) => {
    delete axios.defaults.headers.common[key]
  })
}

// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
export const deleteAuthHeadersFromLocalStorage = (): void => {
  authHeaderKeys.forEach((key: string) => {
    localStorage.removeItem(key)
  })
}

export const getUserAttributesFromResponse = (
  userAttributes: SingleLayerStringMap,
  response: AuthResponse
): SingleLayerStringMap => {
  const invertedUserAttributes: SingleLayerStringMap = invertMapKeysAndValues(userAttributes)
  const userAttributesBackendKeys: string[] = Object.keys(invertedUserAttributes)
  const userAttributesToReturn: SingleLayerStringMap = {}
  Object.keys(response.data.data).forEach((key: string) => {
    if (userAttributesBackendKeys.indexOf(key) !== -1) {
      userAttributesToReturn[invertedUserAttributes[key]] = response.data.data[key]
    }
  })
  return userAttributesToReturn
}
