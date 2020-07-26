import { Reducer } from 'redux'
import {GenerateAuthActions} from './src/actions'
import {GenerateRequireSignInWrapper} from './src/generate-require-signin-wrapper'
import {
  ReduxState,
} from './src/types'

export const reduxTokenAuthReducer: Reducer<ReduxState>

export const generateAuthActions: GenerateAuthActions

export const generateRequireSignInWrapper: GenerateRequireSignInWrapper
