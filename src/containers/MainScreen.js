// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';

import styles from './styles';

class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'Home Screen',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the main screen
        </Text>
        <Button
          onPress={() =>
            this.props.dispatch(NavigationActions.navigate({ routeName: 'Record' }))}
          title="Go to record screen"
        />
      </View>
    );
  }

}

MainScreen.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(MainScreen);
