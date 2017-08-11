/**
 * This is a placeholder screen until we figure out the proper nav of the
 * application.
 *
 * @flow
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';
import { connect }                from 'react-redux';
import Icon                       from 'react-native-vector-icons/Foundation';

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
        <View>
          <Text style={styles.welcome}>
            This is the main screen - Hello Ryan!
          </Text>
          <Text style={styles.welcome}>
            {db.getAllCapsules().length} Capsules
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
          
          <Icon size={50} style={{padding:20}} />
          <Icon name="record" size={50} style={{padding:20}}
            onPress={() =>
              this.props
                .dispatch(NavigationActions
                  .navigate({ routeName: 'CapsuleDuration' }))}
            title="Record"
          />
          <Icon name="list" size={50} style={{padding:20}}
            onPress={() =>
              this.props
                .dispatch(NavigationActions
                  .navigate({ routeName: 'CapsuleList' })
                  )
              }
            title="Capsules"
          />
          
        </View>
      </View>
    );
  }

}

MainScreen.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(MainScreen);
