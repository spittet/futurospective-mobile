/**
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