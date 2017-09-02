import {
  DO_THING,
  DoThingAction,
} from './types'

const configureActions = (authUrl: string) => {
  const doThing = (): DoThingAction => ({
    type: DO_THING,
  })

  const doThunkThing = () => async function (): Promise<void> {
    new Promise((resolve) => resolve())
  }

  return {
    doThing,
    doThunkThing,
  }
}

export default configureActions
