import { SingleLayerStringMap } from '../types'
import { invertMapKeysAndValues } from './utility'

describe('invertMapKeysAndValues', () => {
  it('sets the values as the keys and the keys as the values', () => {
    const stringMap: SingleLayerStringMap = {
      firstName: 'first_name',
      last_name: 'lastName',
    }
    const result: SingleLayerStringMap = invertMapKeysAndValues(stringMap)
    const expectedResult: SingleLayerStringMap = {
      first_name: 'firstName',
      lastName: 'last_name',
    }
    expect(result).toEqual(expectedResult)
  })
})
