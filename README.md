# Futurospective Mobile Client

This repository contains the code for the mobile client of futurospective.

Futurospective is a time-capsule app that lets users leave messages to themselves in the future.

For more details go to http://futurospective.com.

## About this repo

This is a React Native application built with Node 6. 

## Installation

This installation has been tested on OSX 10.12.5.

### Install Xcode and Android 

Follow the installation steps documented on React Native's website for Xcode and Android:
  * [Xcode](https://facebook.github.io/react-native/docs/getting-started.html#xcode)
  * [Android](https://facebook.github.io/react-native/docs/getting-started.html#android-development-environment)

### Cloning and installing Node
To clone and run this application you'll need [Git](https://git-scm.com/), [Homebrew](https://brew.sh/) and [NVM](https://github.com/creationix/nvm). Then run the commands below.

```bash
# Clone the repository
$ git clone git@bitbucket.org:futurospective/futurospective-mobile.git

# Go into the repository
$ cd futurospective-mobile

# Install Node via NVM. This will install the version mentioned in the .nvmrc file.
$ nvm install

# Install watchman - Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.
$ brew install watchman
```

### Install React Native CLI and the dependencies

The React Native CLI will let you start your mobile client from your terminal.

```bash
# Install the React Native CLI globally
$ npm install -g react-native-cli

# Install dependencies
$ yarn
```

## Running tests

```bash
# Static type checking with flow
$ npm run flow
# Linting
$ npm run lint
```

Testing with _npm test_ is currently broken - haven't had the time to get my head around this yet as Enzyme does not support react v16-alpha (which makes total sense).

## License

Released under MIT License

