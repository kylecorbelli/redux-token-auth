import {AsyncStorage} from "react-native";

const RNAsyncStorage = {
  getItem: (key: string): Promise<any> => AsyncStorage.getItem(key),

  setItem: (key: string, value: string) => {
    if (value == null) {
        return Promise.resolve()
    }

    return AsyncStorage.setItem(key, value)
  },

  removeItem: (key: string): Promise<any> => AsyncStorage.removeItem(key),

  clear: () => AsyncStorage.clear(),

  getAllKeys: () => AsyncStorage.getAllKeys(),

  multiGet: (keys: string[]) => AsyncStorage.multiGet(keys),

  multiSet: (keyValuePairs: string[][]) => AsyncStorage.multiSet(keyValuePairs),
}

export default RNAsyncStorage
