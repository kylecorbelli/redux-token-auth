# Redux Token Auth
<img src='https://ih1.redbubble.net/image.170071318.1044/ap,550x550,12x16,1,transparent,t.u4.png' height='500'>

This is going to be the raddest client-side solution for user authentication using React and Redux with a Rails backend that uses Devise...

But Ooh Wee! It's not quite ready yet.

Still cleaning up, TypeScripting, and unit testing the s**t out of it.

Documentation to follow.

## Installation
`npm install --save redux-token-auth`

Have you ever installed an NPM module another way?

## Dependencies
Your project will need the popular <a href="https://github.com/gaearon/redux-thunk">Redux Thunk</a> middleware (written by none other than the man, the myth, the legend Dan Abramov himself) in order to function properly.

## Making it Work
`redux-token-auth` has several exports, but primarily exports a Redux reducer, a handful of asynchronous Redux Thunk actions, and a utility function that verifies the current user's credentials as stored in the browser's local storage. React Native equivalents are forthcoming.
### Redux Reducer
### Actions and Utilities
#### Auth URL

In order for the module to communicate with your backend, you'll need to provide it with the base URL for your authentication endpoint. It's often a good idea to place this somewhere in a config file that sets this URL depending on the environment (development, test, or production). Here we'll assume you have a file called `constants.js` in the root directory of your project that does just that.

Now we'll be adding that URL to a config object that has three keys:
1. `authUrl`
2. `userAttributes`
3. `userRegistrationAttributes`

#### User and Registration Attributes

The `userAttributes` and `userRegistrationAttributes` values are themselves objects that contain the shape of your `User` model. `redux-token-auth` will parse these objects in order to send the appropriate request bodies as well as to interpret response data to populate your client-side redux state.

For each of these objects, the keys will be the names of the attributes as known to your frontend and the values will be strings that are the names of the attributes as known to your backend. An example would be:
```javascript
userAttributes: {
  firstName: 'first_name',
  lastName: 'last_name',
}
```

This is to account for the different case conventions between JavaScript and Ruby and allows `redux-token-auth` to facilitate communication between the two.

Regarding the difference between `userAttributes` and `userRegistrationAttributes`, While `userAttributes` contains all the attributes of your `User` model, `userRegistrationAttributes` contains only those attributes necessary for registration.

It is important to note that `email` and `password` should **not** be included in these objects as they are already accounted for and adding them may result in unexpected behavior.

#### Bringing the Config Together

Create a file called something like `redux-token-auth-config.js` in the root directory of your project. Honestly, it doesn't need to be named that but that's what we'll call it here. Open that file and import `generateAuthActions` from the module. This is a function that takes your config object as its only input. It returns an object containing several Redux Thunk actions and the utility function to verify user credentials upon initialization of your app. Here's an example:

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
    imageUrl: 'image',
  },
}

const {
  signInUser,
  signOutUser,
  registerUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  signInUser,
  signOutUser,
  registerUser,
  verifyCredentials,
}
```
Simply export these functions from your config file. Now they're available throughout your app by importing them from your config file. An example would be your sign in form:

```javascript
// components/SignInScreen.js
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signInUser } from '../redux-token-auth-config'

class SignInScreen extends Component {
  constructor (props) { ... }

  submitForm (e) {
    e.preventDefault()
    const {
      email,
      password,
    } = this.state
    signInUser({ email, password }) // <-<-<-<-<- here's the important part <-<-<-<-<-
      .then(...)
      .catch(...)
  }

  render () {
    <div>
      <form onSubmit={this.submitForm}>...</form>
    </div>
  }
}

export default connect(
  null,
  { signInUser },
)(SignInScreen)
```
