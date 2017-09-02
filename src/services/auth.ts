import axios from 'axios'
import { AuthHeaders } from '../types'

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
