/**
 * This is the main application file. I'm not using a single index.js as I'm
 * not sure yet that the same init can apply for both iOS and Android.
 * 
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './reducers';
import AppWithNavigationState from './containers/AppNavigator';

export default class LocapsMobileApp extends React.Component {
  store = createStore(AppReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}