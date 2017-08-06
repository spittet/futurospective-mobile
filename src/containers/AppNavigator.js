/**
 * Application Nav
 *
 * The normal userflow is the following:
 * MainScreen .-> Record Screen -> Preview Screen -> Capsules list
 *       (or) |-> Capsules list -> Capsule
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
import CapsuleListScreen from './CapsuleListScreen';
import CapsuleDetailsScreen from './CapsuleDetailsScreen';

export const AppNavigator = StackNavigator({
  Main: { screen: MainScreen },
  Record: { screen: RecordScreen },
  Preview: { screen: PreviewScreen },
  CapsuleList: { screen: CapsuleListScreen },
  CapsuleDetails: { screen: CapsuleDetailsScreen }
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
