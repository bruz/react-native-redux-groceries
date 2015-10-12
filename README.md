# Groceries

A simple grocery list app using React Native, Redux, Firebase, and Async Storage for offline data. It currently only works on iOS, but not Android. Once [this commit](https://github.com/facebook/react-native/commit/f4857a6d4237014cd66c213804ae54a99d71efaa) makes it into a React Native release it ought to work on Android.

## Install

Built and tested with:

* OSX
* Xcode 7
* Node 4.1.1

A [Firebase](https://www.firebase.com) account is also needed.

Run:

    git clone git@bitbucket.org:bruzilla/groceries.git
    cd groceries
    npm install

Configure:

    cp config.js.example config.js

Edit config.js to have the URL of your Firebase app.

## Run

    open ios/Groceries.xcodeproj

This will launch Xcode. Just choose a device a press run.

## Build and install on device

* Run:


    react-native bundle --minify

* In AppDelegate.m, comment out:


    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];

* Then uncomment this in AppDelegate.m:


    //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

* In the Xcode menu, go to Product -> Scheme -> Edit Scheme..., and under Run change the Build Configuration to Release.
* Choose your device in Xcode and run it on there.

To get back to development mode, just undo these changes.
