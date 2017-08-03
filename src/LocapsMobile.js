/**
 * This is the main application file. I'm not using a single index.js as I'm
 * not sure yet that the same init can apply for both iOS and Android.
 * 
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import RNFS from 'react-native-fs';

import { CAPSULES_DIR } from './config';

import AppReducer from './reducers';
import AppWithNavigationState from './containers/AppNavigator';

export default class LocapsMobileApp extends React.Component {
  store = createStore(AppReducer, applyMiddleware(logger));

  createDocumentDirectory = () => {
    RNFS.exists(CAPSULES_DIR).then((result) => {
      if (!result) {
        RNFS.mkdir(CAPSULES_DIR);
      } else {
        console.log('dir found');
      }
    });
    
  }

  render() {
    this.createDocumentDirectory();
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}