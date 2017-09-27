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

const Storage = window.localStorage ? AsyncLocalStorage : AsyncStorage
export default Storage
