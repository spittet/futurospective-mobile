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
import { ListView } from 'realm/react-native';
import styles from './styles';

import { NavigationActions } from 'react-navigation';
import { 
  getCapsulesAction
} from '../actions';


class MainScreen extends React.Component {

  static navigationOptions = {
    title: 'Capsules Screen',
  };

  constructor(props: Object) {
    super(props);
  }

  componentWillMount() {
    this._loadData();
  }

  _loadData = () => {
    this.props.dispatch(getCapsulesAction());
  }

  render() {
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1.id !== r2.id
      })
      .cloneWithRows(this.props.capsuleItems.items);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is the Capsule List screen
        </Text>
        {this.props
          .capsuleItems
          .items
          .length  > 0 &&
        <ListView
          dataSource={dataSource}
          renderRow={(capsule) => <Text>{capsule.publishedAt}</Text>}
        />
        }
      </View>
    );
  }

}

MainScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
  capsuleItems: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    capsuleItems: state.capsuleItems
  }
}

export default connect(mapStateToProps)(MainScreen);
