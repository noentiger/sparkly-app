Sparkly App
===========

![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

## Prepare environment

Install node and watchman via homebrew
```term
$ brew install node
$ brew install watchman
```
Install the React Native CLI
```term
$ npm install -g react-native-cli
```

## Install application

Clone this repository:
```term
$ git clone git@github.com:noentiger/sparkly-app.git && cd $_
$ npm install
```

## Run application

Run application in iOS Simulator
```term
$ react-native run-ios
```

## Deploy with Fastlane

The app can be built to TestFlight and released using [Fastlane](https://fastlane.tools/).

Install Fastlane
```term
$ gem install fastlane
```

Build app to iTunes Connect and TestFlight
```term
$ fastlane ios beta
```

## Licensing

Copyright 2016 Kim Wijk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
