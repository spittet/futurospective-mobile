/*
 * This is the screen where the user records a capsule
 *
 * @flow
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const RecordScreen = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      This is the record screen
    </Text>
  </View>
);

RecordScreen.navigationOptions = {
  title: 'Record Screen',
};

export default RecordScreen;
