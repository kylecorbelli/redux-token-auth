import { Reducer } from 'redux'
import {
  ActionsGeneratorExport,
  GenerateRequireSignInWrapperConfig,
  RequireSignInWrapper,
} from './src/types'

export const reduxTokenAuthReducer: Reducer<{}>

export const generateAuthActions: ActionsGeneratorExport

export const generateRequireSignInWrapper: (config: GenerateRequireSignInWrapperConfig) => RequireSignInWrapper
