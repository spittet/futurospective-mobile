/*
 * This is the screen where the user records a capsule
 *
 * @flow
 */
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

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
