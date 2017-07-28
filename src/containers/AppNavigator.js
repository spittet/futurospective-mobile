/**
 * Application Nav
 *  
 * @flow
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import MainScreen from './MainScreen';
import RecordScreen from './RecordScreen';
import PreviewScreen from './PreviewScreen';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Record: { screen: RecordScreen },
  Preview: { screen: PreviewScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState);
