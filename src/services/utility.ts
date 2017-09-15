import { SingleLayerStringMap } from '../types'

export const invertMapKeysAndValues = (stringMap: SingleLayerStringMap): SingleLayerStringMap => {
  const newStringMap: SingleLayerStringMap = {}
  for (let key in stringMap) {
    const val = stringMap[key]
    newStringMap[val] = key
  }
  return newStringMap
}
