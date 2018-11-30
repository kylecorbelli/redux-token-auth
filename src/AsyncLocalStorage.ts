import AsyncStorage from '@callstack/async-storage'

const AsyncLocalStorage = {
  getItem: (key: string): Promise<any> => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        const value: string | null = window.localStorage.getItem(key)
        resolve(value)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.getItem(key).then(value => {
        resolve(value)
      }, reject)
    }

  }),

  setItem: (key: string, value: string) => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value)
        resolve(value)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.setItem(key, value).then(() => {
        resolve(value)
      }, reject)
    }
  }),

  removeItem: (key: string): Promise<any> => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        const value: string | null = window.localStorage.getItem(key)
        window.localStorage.removeItem(key)
        resolve(value)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.removeItem(key).then(() => {
        resolve()
      }, reject)
    }
  }),

  clear: () => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        window.localStorage.clear()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.clear().then(() => {
        resolve(true)
      }, reject)
    }
  }),

  getAllKeys: () => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        const allKeys = Object.keys(window.localStorage)
        resolve(allKeys)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.getAllKeys().then(allKeys => {
        resolve(allKeys)
      }, reject)
    }
  }),

  multiGet: (keys: string[]) => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        const values = keys.map(key => [key, window.localStorage.getItem(key)])
        resolve(values)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.multiGet(keys).then(values => {
        resolve(values)
      }, reject)
    }
  }),

  multiSet: (keyValuePairs: string[][]) => new Promise((resolve, reject) => {
    if (window.localStorage) {
      try {
        keyValuePairs.forEach(keyValuePair => window.localStorage.setItem(keyValuePair[0], keyValuePair[1]))
        const newKeyValuePairs = keyValuePairs.map(keyValuePair => [keyValuePair[0], window.localStorage.getItem(keyValuePair[0])])
        resolve(newKeyValuePairs)
      } catch (error) {
        reject(error)
      }
    } else {
      AsyncStorage.multiSet(keyValuePairs).then(() => {
        resolve()
      }, reject)
    }
  }),
}

export default AsyncLocalStorage
