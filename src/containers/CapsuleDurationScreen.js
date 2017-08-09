// This screen is where the user selects the duration of the capsule
// @flow

import React                           from 'react';
import PropTypes                       from 'prop-types';
import { connect }                     from 'react-redux';

import { 
  Button,
  Picker, 
  Text, 
  View
}                                      from 'react-native';
import styles                          from './styles';

import { config }                      from '../config';
import { setNewCapsulePublishDate }    from '../actions';
import { NavigationActions }           from 'react-navigation';

class CapsuleRecordScreen extends React.Component {

  static navigationOptions = {
    title: 'Record a newa capsule'
  }

  state: {
    duration: string
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      duration: config.CAPSULE_PERIOD_1MIN
    };
  }

  _updateDuration = (duration) => {
    this.setState({duration: duration});
  }

  _record = async () => {
    await this.props.dispatch(setNewCapsulePublishDate(this.state.duration));
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Record' }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{flex: 1}}>
          Create a capsule that will be available in:
        </Text>
        <Picker
          style={{flex: 3}}
          selectedValue={this.state.duration}
          onValueChange={(duration) => this._updateDuration(duration)}>
          <Picker.Item label="1 minute" value={config.CAPSULE_PERIOD_1MIN} />
          <Picker.Item label="2 weeks" value={config.CAPSULE_PERIOD_2W} />
          <Picker.Item label="1 month" value={config.CAPSULE_PERIOD_1M} />
          <Picker.Item label="3 months" value={config.CAPSULE_PERIOD_3M} />
          <Picker.Item label="6 months" value={config.CAPSULE_PERIOD_6M} />
          <Picker.Item label="1 year" value={config.CAPSULE_PERIOD_1Y} />
        </Picker>
        <Button
          onPress={() => {
            this._record();
          }}
          title="Record"
          style={{flex: 1}}
        />
      </View>
    );
  }

}

CapsuleRecordScreen.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(CapsuleRecordScreen);
