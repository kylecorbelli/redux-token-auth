import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {
  GenerateRequireSignInWrapperConfig,
  ReduxState,
} from './types'

const generateRequireSignInWrapper = (
  { redirectPathIfNotSignedIn }: GenerateRequireSignInWrapperConfig
) => {
  const requireSignInWrapper = (PageComponent: React.ComponentClass | React.FunctionComponent) => {

    const mapStateToProps = (state: ReduxState) => ({
      hasVerificationBeenAttempted: state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted,
      isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn
    })

    const connector = connect(mapStateToProps)
    type PropsFromRedux = ConnectedProps<typeof connector>

    type Props = PropsFromRedux & {
      readonly history: {
        readonly replace: (path: string) => void
      }
    }
    class GatedPage extends React.Component<Props> {
      public componentDidUpdate() {
        const {
          history,
          hasVerificationBeenAttempted,
          isSignedIn,
        } = this.props
        if (hasVerificationBeenAttempted && !isSignedIn) {
          history.replace(redirectPathIfNotSignedIn)
        }
      }

      public render (): JSX.Element {
        const {
          hasVerificationBeenAttempted,
          isSignedIn,
        } = this.props

        return (hasVerificationBeenAttempted && isSignedIn) ?
          <PageComponent {...this.props} />
          :
          <div></div>;
      }
    }

    return connect(
      mapStateToProps,
    )(GatedPage)
  }

  return requireSignInWrapper
}

export default generateRequireSignInWrapper
export type GenerateRequireSignInWrapper = typeof generateRequireSignInWrapper
