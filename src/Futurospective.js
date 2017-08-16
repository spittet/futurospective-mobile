/**
 * This is the main application file. I'm not using a single index.js as I'm
 * not sure yet that the same init can apply for both iOS and Android.
 * 
 * @flow
 */

import React                      from 'react';
import { Provider }               from 'react-redux';
import { 
  applyMiddleware, 
  createStore 
}                                 from 'redux';
import logger                     from 'redux-logger';

import AppReducer                 from './reducers';
import AppWithNavigationState     from './containers/AppNavigator';

import { locapsInit }             from './config';

import { analyticsLogger }        from './middleware';

locapsInit();

export default class FuturospectiveApp extends React.Component {
  
  store = createStore(AppReducer, applyMiddleware(logger, analyticsLogger));

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}