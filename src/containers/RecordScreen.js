/*
 * This is the screen where the user records a capsule
 *
 * @flow
 */
import React from 'react';
import { Text, View } from 'react-native';
import Camera from 'react-native-camera';

import styles from './styles';

class RecordScreen extends React.Component {
  static navigationOptions = {
    title: 'Record Screen',
  };;

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the record screen
        </Text>
      </View>
    );
  }
}

export default RecordScreen;
