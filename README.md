# SimpleWeek hybrid mobile application

[![Join the chat at https://gitter.im/SimpleWeek/hybrid-app](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/SimpleWeek/hybrid-app?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Code Climate](https://codeclimate.com/github/SimpleWeek/hybrid-app/badges/gpa.svg)](https://codeclimate.com/github/SimpleWeek/hybrid-app) [![bitHound Score](https://www.bithound.io/github/SimpleWeek/hybrid-app/badges/score.svg)](https://www.bithound.io/github/SimpleWeek/hybrid-app) [![Build Status](https://travis-ci.org/SimpleWeek/hybrid-app.svg?branch=master)](https://travis-ci.org/SimpleWeek/hybrid-app) [![Test Coverage](https://codeclimate.com/github/SimpleWeek/hybrid-app/badges/coverage.svg)](https://codeclimate.com/github/SimpleWeek/hybrid-app)

Hybrid mobile application built with Ionicframework / Cordova / AngularJS for http://simpleweek.com

# OAuth2-secured API

Key  | Value
------------- | -------------
CLIENT_ID  | 1_3zb3kuyxz06cs848ogosoos4kc40808okso4o4gkgs4s0w4s4o
CLIENT_SECRET  | 5na7xb8cjc0084w80s4s8gckcs8c4ooc0ks0w0g8okwwkgsk88

### Get a token:
    GET https://simpleweek.com/oauth/v2/token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&grant_type=password&username=USERNAME&password=PASSWORD

### Then make API calls using fetched 'acess token':
    GET https://simpleweek.com/api/todos?access_token=TOKEN

# Running application in Browser

`grunt serve`

# Running application with iOS simulator

`grunt emulate:ios -l -c --target="iPhone-5s"`

# Watch iOS simulators logs

`tail -f ~/Library/Logs/CoreSimulator/%SIMULATOR_NAME%/system.log`


List of available images:
`./platforms/ios/cordova/lib/list-emulator-images`


# Debugging application with ADB

Run `adb logcat Cordova:D DroidGap:D CordovaLog:D *:S`
