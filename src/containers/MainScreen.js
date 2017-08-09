/**
 * This is a placeholder screen until we figure out the proper nav of the
 * application.
 *
 * @flow
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';

import { 
  Button, 
  Text, 
  View 
}                                 from 'react-native';
import styles                     from './styles';

import { NavigationActions }      from 'react-navigation';
import db                         from '../db';

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
        <Text style={styles.welcome}>
          {db.getAllCapsules().length} Capsules
        </Text>
        <Button
          onPress={() =>
            this.props
              .dispatch(NavigationActions
                .navigate({ routeName: 'CapsuleList' })
                )
            }
          title="Go to Capsules screen"
        />
        <Button
          onPress={() =>
            this.props
              .dispatch(NavigationActions
                .navigate({ routeName: 'CapsuleDuration' }))}
          title="Go to capsule duration screen"
        />
      </View>
    );
  }

}

MainScreen.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(MainScreen);
