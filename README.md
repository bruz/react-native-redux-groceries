# Groceries

A simple grocery list app using React Native, Redux, Firebase, and Async Storage for offline data. It works on both iOS and Android.

[![Code Climate](https://codeclimate.com/github/bruz/react-native-redux-groceries/badges/gpa.svg)](https://codeclimate.com/github/bruz/react-native-redux-groceries)
[![Dependency Status](https://david-dm.org/bruz/react-native-redux-groceries.svg)](https://david-dm.org/bruz/react-native-redux-groceries)
[![MIT License](https://img.shields.io/github/license/bruz/react-native-redux-groceries.svg)](https://github.com/bruz/react-native-redux-groceries/blob/master/LICENSE)

![demo](demo.gif)

## Install

Built and tested with:

* OS X / macOS
* Node 10
* Xcode 10
* Android SDK

A [Firebase](https://firebase.google.com) account is also needed. The security rules for the database must be set to public, since this app doesn't implement authentication. In the [Firebase Console](https://firebase.google.com/console/) under the Database section, Rules tab, change the rules to:

```javascript
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Run:

```bash
git clone https://github.com/bruz/react-native-redux-groceries.git groceries
cd groceries
npm install
```

Configure:

```bash
cp config.js.example config.js
```

Update config.js with your Firebase app credentials.

## Develop

Follow the [React Native Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide.

## Build and install on an iOS device

* In the Xcode menu, go to Product -> Scheme -> Edit Scheme..., and under Run change the Build Configuration to Release.
* Choose your device in Xcode and run it on there.

To get back to development mode, just change the Build Configuration back to Debug.

## Build and install on an Android device

Follow the [React Native APK signing instructions](https://facebook.github.io/react-native/docs/signed-apk-android.html).

## Credits

Grocery bag icon by [Claire Jones from the Noun Project](https://thenounproject.com/hivernoir)
