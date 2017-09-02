import axios from 'axios'
import { AuthHeaders } from '../types'
import {
  setAuthHeaders,
  deleteAuthHeaders,
} from './auth'

describe('auth service', () => {
  const headers: AuthHeaders = {
    'access-token': 'accessToken',
    'token-type': 'tokenType',
    client: 'client',
    expiry: 'expiry',
    uid: 'uid',
  }

  describe('setAuthHeaders', () => {
    it('sets the appropriate auth headers on the global axios config', () => {
      setAuthHeaders(headers)
      Object.keys(headers).forEach((key: string) => {
        expect(axios.defaults.headers.common[key]).toBe(headers[key])
      })
    })
  })

  describe('deleteAuthHeaders', () => {
    it('deletes the appropriate auth headers from the global axios config', () => {
      deleteAuthHeaders()
      Object.keys(headers).forEach((key: string) => {
        expect(axios.defaults.headers.common['access-token']).toBeUndefined()
      })
    })
  })
})
