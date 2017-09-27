import axios from 'axios'
import { invertMapKeysAndValues } from './utility'
import {
  AuthHeaders,
  AuthResponse,
  SingleLayerStringMap,
} from '../types'
import { AsyncStorage } from 'react-native'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rip this out into its own npm package:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const AsyncLocalStorage = {
  getItem: (key: string): Promise<any> => new Promise((resolve, reject) => {
    try {
      const value: string | null = window.localStorage.getItem(key)
      resolve(value)
    } catch (error) {
      reject(error)
    }
  }),

  setItem: (key: string, value: string) => new Promise((resolve, reject) => {
    try {
      window.localStorage.setItem(key, value)
      resolve(value)
    } catch (error) {
      reject(error)
    }
  }),

  removeItem: (key: string): Promise<any> => new Promise((resolve, reject) => {
    try {
      const value: string | null = window.localStorage.getItem(key)
      window.localStorage.removeItem(key)
      resolve(value)
    } catch (error) {
      reject(error)
    } 
  }),

  clear: () => new Promise((resolve, reject) => {
    try {
      window.localStorage.clear()
      resolve(true)
    } catch (error) {
      reject(error)
    }
  }),

  getAllKeys: () => new Promise((resolve, reject) => {
    try {
      const allKeys = Object.keys(window.localStorage)
      resolve(allKeys)
    } catch (error) {
      reject(error)
    }
  }),

  multiGet: (keys: string[]) => new Promise((resolve, reject) => {
    try {
      const values = keys.map(key => [ key, window.localStorage.getItem(key) ])
      resolve(values)
    } catch (error) {
      reject(error)
    }
  }),

  multiSet: (keyValuePairs: string[][]) => new Promise((resolve, reject) => {
    try {
      keyValuePairs.forEach(keyValuePair => window.localStorage.setItem(keyValuePair[0], keyValuePair[1]))
      const newKeyValuePairs = keyValuePairs.map(keyValuePair => [ keyValuePair[0], window.localStorage.getItem(keyValuePair[0]) ])
      resolve(newKeyValuePairs)
    } catch (error) {
      reject(error)
    }
  }),
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^ Rip this out into its own npm package
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let Storage = window.localStorage ? AsyncLocalStorage : AsyncStorage

// try {
//   Storage = AsyncStorage
// } catch (e) {
//   Storage = AsyncLocalStorage
// }

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
  // use multiSet:
  authHeaderKeys.forEach((key: string) => {
    Storage.setItem(key, headers[key])
  })
}

export const deleteAuthHeaders = (): void => {
  authHeaderKeys.forEach((key: string) => {
    delete axios.defaults.headers.common[key]
  })
}

// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
export const deleteAuthHeadersFromLocalStorage = async (): Promise<void> => {
  // can use multiRemove once you've written it:
  authHeaderKeys.forEach((key: string) => {
    Storage.removeItem(key)
    // localStorage.removeItem(key)
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
