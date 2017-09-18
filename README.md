# Redux Token Auth

[![CircleCI](https://circleci.com/gh/kylecorbelli/redux-token-auth.svg?style=shield)](https://circleci.com/gh/kylecorbelli/redux-token-auth)

[![codecov](https://codecov.io/gh/kylecorbelli/redux-token-auth/branch/master/graph/badge.svg)](https://codecov.io/gh/kylecorbelli/redux-token-auth)

<img src='https://californiadevlife.files.wordpress.com/2017/01/beer-token.jpg' height='300'>

This is the raddest client-side solution for user authentication using React and Redux with a Rails backend that uses Devise Token Auth.

## TL;DR
Given a Rails backend using Devise Token Auth, this module provides several asynchronous Redux Thunk actions to:
- Register a user (`registerUser`).
- Sign in a user (`signInUser`).
- Sign out a user (`signOutUser`).
- Verify the current user’s auth token (`verifyToken`).

It also provides the corresponding Redux reducer to handle these actions.

Additionally, a helper function is provided to verify the current user's auth token upon initialization of your application (`verifyCredentials`).

Finally, `redux-token-auth` provides a component wrapper that will gate your specified page components if the user is not signed in This is to prevent unauthorized users from accessing particular pages in your app. <a href="https://github.com/ReactTraining/react-router">React Router v4.0.0+</a> is required for this to work properly.

## Installation
`npm install --save redux-token-auth`

Have you ever installed an NPM module any other way?

## Dependencies
Your project will need the popular <a href="https://github.com/gaearon/redux-thunk" target="_blank">Redux Thunk</a> middleware (written by none other than the man, the myth, the legend Dan Abramov himself) in order to function properly.

## Making it Work
There are four main things you need to do in order to get `redux-token-auth` rigged up:
1. Integrate `reduxTokenAuthReducer` into your Redux store.
2. Generate the Redux Thunk actions and credential verification helper function.
3. Call `verifyCredentials` in your `index.js` file.
4. Generate the component wrapper to gate your protected pages by invoking `generateRequireSignInWrapper`.

`redux-token-auth` has two exports: a Redux reducer, and a function that generates a handful of asynchronous Redux Thunk actions, and a helper function that verifies the current user's credentials as stored in the browser's `localStorage`. React Native equivalents using `AsyncStorage` are roadmapped but not yet supported.
### 1. Redux Store

#### Redux Reducer
`redux-token-auth` ships with a reducer to integrate into your Redux store. Wherever you define your root reducer, simply import and include `reduxTokenAuthReducer` in your call to `combineReducers`:
```javascript
import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
})

export default rootReducer
```
We'll note here again that you need <a href="https://github.com/gaearon/redux-thunk" target="_blank">Redux Thunk</a> integrated into your store in order for `redux-token-auth` to work properly.

#### Initial State

As with any Redux application, when configuring your store you’ll need to specify the initial state. Given the structure of `redux-token-auth`’s reducer, the initial state should be structured something like this:

```javascript
// redux/initial-state.js
const initialState = {
  reduxTokenAuth: {
    currentUser: {
      isLoading: false,
      isSignedIn: false,
      attributes: {
        firstName: null, // <-- Just an example. Attributes are whatever you specify in your cofig (below).
      },
    },
  },
  // All your other state
}

export default initialState
```

### 2. Generate Actions and Helper Function
`redux-token-auth` provides a function called `generateAuthActions` that takes a config object and returns the asynchronous Redux Thunks actions and the helper function to verify the user’s credentials upon initialization of your application. The following paragraphs explain the config object.
#### Auth URL

In order for `redux-token-auth` to communicate with your backend, you'll need to provide it with the base URL for your authentication endpoint. It's often a good idea to place this URL somewhere in a config file that sets it depending on the environment (development, test, or production). Here we'll assume you have a file called `constants.js` in the root directory of your project that does just that. The URL should be the full URL **not** end with `/`. For example `https://radapp.io/auth` or `http://localhost:300/auth`.

Now we'll be adding that URL to a config object that has three keys:
1. `authUrl`
2. `userAttributes`
3. `userRegistrationAttributes`

#### User and User Registration Attributes

The `userAttributes` and `userRegistrationAttributes` values are themselves objects that contain the shape of your `User` model. `redux-token-auth` will parse these objects in order to send the appropriate request bodies as well as to interpret response data to populate your client-side Redux state.

Regarding the difference between `userAttributes` and `userRegistrationAttributes`, while `userAttributes` contains all the attributes of your `User` model, `userRegistrationAttributes` contains only those attributes necessary for registration.

For each of these objects, the keys will be the names of the attributes as known to your frontend and the values will be strings that are the names of the attributes as known to your backend. An example would be:
```javascript
userAttributes: {
  firstName: 'first_name',
  lastName: 'last_name',
  imageUrl: 'image',
}
```

This is to account for the different case conventions between JavaScript and Ruby, and allows `redux-token-auth` to facilitate communication between the two. It can also bridge the gap between however you want to name your user attributes on the backend versus how you want to name them on the frontend. Maybe you want to call it `imageUrl` on the frontend and `image` on the backend. It’s your call. Go nuts.

It is important to note that `email` and `password` should **not** be included in these objects as they are already accounted for and adding them may result in unexpected behavior.

#### Bringing the Config Together

Create a file called something like `redux-token-auth-config.js` in the root directory of your project. Honestly, it doesn't need to be named that but that's what we'll call it here. Open that file and import `generateAuthActions` from the `redux-token-auth`. As noted above, this is a function that takes your config object as its only input. It returns an object containing several named Redux Thunk actions and the helper function to verify user credentials upon initialization of your app. Here's an example:

```javascript
// redux-token-auth-config.js
import { generateAuthActions } from 'redux-token-auth'
import { authUrl } from './constants'

const config = {
  authUrl,
  userAttributes: {
    firstName: 'first_name',
    imageUrl: 'image',
  },
  userRegistrationAttributes: {
    firstName: 'first_name',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
```
Simply export these functions from your config file. Now they're available throughout your app by importing them from your config file.

`registerUser`, `signInUser`, and `signOutUser` are Redux Thunk actions and thus, when wired through `mapDispatchToProps` return Promises.

### 3. Verifying User Credentials on App Initialization
Upon initialization of your app, your user could potentially be logged in from their previous session and your application state should reflect that. `redux-token-auth` stores an authenticated user’s auth token in `localStorage`. In order to sync the stored token with both your backend and your Redux store, you’ll use the `verifyCredentials` function that was returned from `generateAuthActions`. In short, it checks for a token, sends a verification request to the backend, and upon receiving a successful response, updates your Redux store. Here's an example of how you wire it up in your `index.js` file, with a single line:

```javascript
// index.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App'
import configureStore from './redux/configure-store'
import { verifyCredentials } from './redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module

const store = configureStore()
verifyCredentials(store) // <-<-<-<-<- here's the important part <-<-<-<-<-

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

And that's really all there is to it!

### 4. Generate the Component Wrapper to Gate Pages
Naturally, some of the pages of your application will only pertain to authorized users and shouldn’t be accessible to users who are not signed in. `redux-token-auth` provides a way to wrap these protected page components so that unauthorized users will be redirected away if they try to access them.

You’re given the flexibility to specify where those users are redirected to with a simple config object. In the file where you specify your client-side routing, import `generateRequireSignInWrapper` from `redux-token-auth`. This is a function that takes a single config object in order to specify the route you’d like unauthorized users redirected to, using the `redirectPathIfNotSignedIn` attribute. It’s important to note, the path you pass in should begin with `/`. For example:

```javascript
import * as React from 'react'
import {
  Router,
  Route,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import HomePage from './components/HomePage'
import SomeProtectedPageComponent from './components/SomeProtectedPageComponent'
import SignInPage from './components/SignInPage'
import { generateRequireSignInWrapper } from 'redux-token-auth'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/signin',
})

const history = createBrowserHistory({})

const Routes = () => (
  <Router history={history}>
    <div>
      <Route exact={true} path="/" component={HomePage} />
      <Route path="/protected" component={requireSignIn(SomeProtectedPageComponent)} />
      <Route path="/signin" component={SignInPage} />
    </div>
  </Router>
)
```

Simply wrap the page components you want protected with the generated wrapper and you’re good to go!

## Usage Examples

Now that everything's set up, let’s take a look at how you’ll use the generated thunk actions in your application.

### `registerUser`
```javascript
// components/RegisterScreen.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module

class RegisterScreen extends Component {
  constructor (props) { ... }

  ...

  submitForm (e) {
    e.preventDefault()
    const { registerUser } = this.props
    const {
      email,
      firstName,
      password,
    } = this.state
    registerUser({ email, firstName, password }) // <-<-<-<-<- here's the important part <-<-<-<-<-
      .then(...)
      .catch(...)
  }

  render () {
    const { submitForm } = this
    <div>
      <form onSubmit={submitForm}>...</form>
    </div>
  }
}

export default connect(
  null,
  { registerUser },
)(RegisterScreen)
```
### `signInUser`

```javascript
// components/SignInScreen.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module

class SignInScreen extends Component {
  constructor (props) { ... }

  ...

  submitForm (e) {
    e.preventDefault()
    const { signInUser } = this.props
    const {
      email,
      password,
    } = this.state
    signInUser({ email, password }) // <-<-<-<-<- here's the important part <-<-<-<-<-
      .then(...)
      .catch(...)
  }

  render () {
    const { submitForm } = this
    <div>
      <form onSubmit={submitForm}>...</form>
    </div>
  }
}

export default connect(
  null,
  { signInUser },
)(SignInScreen)
```

### `signOutUser`
```javascript
// components/SiteHeader.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signOutUser } from '../redux-token-auth-config' // <-- note this is YOUR file, not the redux-token-auth NPM module

class SiteHeader extends Component {
  constructor (props) {...}

  signOut (e) {
    e.preventDefault()
    const { signOutUser } = this.props
    signOutUser() // <-<-<-<-<- here's the important part <-<-<-<-<-
      .then(...)
      .catch(...)
  }

  render () {
    const { signOut } = this
    <div>
      <a href="#" onClick={signOut}>Sign Out</a>
    </div>
  }
}

export default connect(
  null,
  { signOutUser },
)(SiteHeader)
```

## Roadmap
- React Native support
- Password reset support
- Email verification support
- Delete account support

## Contributors
- Kyle Corbelli
