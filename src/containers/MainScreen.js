/**
 * This is a placeholder screen until we figure out the proper nav of the
 * application.
 *
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { 
  Button, 
  Text, 
  View 
} from 'react-native';
import styles from './styles';

import { config } from '../config';
import { setNewCapsulePublishDate } from '../actions';
import { NavigationActions } from 'react-navigation';
import db from '../db';

class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'Home Screen',
  };

  _setCapsulePublishDate = async (period: string) => {
    let publishedAt;

    switch(period) {
      case config.CAPSULE_PERIOD_1MIN:
        publishedAt = moment().add(1, 'm');
        break;
      case config.CAPSULE_PERIOD_2W:
        publishedAt = moment().add(2, 'w');
        break;
      case config.CAPSULE_PERIOD_1M:
        publishedAt = moment().add(1, 'M');
        break;
      case config.CAPSULE_PERIOD_3M:
        publishedAt = moment().add(3, 'M');
        break;
      case config.CAPSULE_PERIOD_6M:
        publishedAt = moment().add(6, 'M');
        break;
      case config.CAPSULE_PERIOD_12M:
        publishedAt = moment().add(12, 'M');
        break;
      default:
        publishedAt = moment();

    }
    
    await this.props.dispatch(
      setNewCapsulePublishDate(publishedAt.toISOString())
    );
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Record' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the main screen
        </Text>
        <Text style={styles.welcome}>
          {db.getCapsules().length} Capsules
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
              .dispatch(NavigationActions.navigate({ routeName: 'Record' }))}
          title="Go to record screen"
        />
        <Button
          onPress={() =>
            this.props
              .dispatch(NavigationActions.navigate({ routeName: 'Preview' }))}
          title="Go to preview screen"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_1MIN);
          }}
          title="Record a 1min capsule"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_2W);
          }}
          title="Record a 2W capsule"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_2W);
          }}
          title="Record a 1M capsule"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_2W);
          }}
          title="Record a 3M capsule"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_2W);
          }}
          title="Record a 6M capsule"
        />
        <Button
          onPress={() => {
            this._setCapsulePublishDate(config.CAPSULE_PERIOD_2W);
          }}
          title="Record a 1Y capsule"
        />
      </View>
    );
  }

}

MainScreen.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(MainScreen);
