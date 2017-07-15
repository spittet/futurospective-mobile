// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Text, StyleSheet, View } from 'react-native';
import { NavigationActions } from 'react-navigation';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const MainScreen = ({ navigation, dispatch }: any) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      This is the main screen
    </Text>
    <Button
      onPress={() => navigation.dispatch({ type: 'Record' })}
      title="Record"
    />
    <Button
      onPress={() =>
        dispatch(NavigationActions.navigate({ routeName: 'Record' }))}
      title="Record 2"
    />
  </View>
);

MainScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MainScreen);
