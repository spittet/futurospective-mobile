/**
 * This is a placeholder screen until we figure out the proper nav of the
 * application.
 *
 * @flow
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';
import { connect }                  from 'react-redux';
import moment                       from 'moment'

import { 
  Text,
  TouchableHighlight,
  View 
}                                   from 'react-native';
import { ListView }                 from 'realm/react-native';
import Icon                         from 'react-native-vector-icons/Ionicons';
import styles                       from './styles';

import { NavigationActions }        from 'react-navigation';
import { 
  getCapsules,
  getCapsule
}                                   from '../actions';


class CapsuleListScreen extends React.Component {

  static navigationOptions = {
    title: 'Your capsules',
  };

  constructor(props: Object) {
    super(props);
  }

  componentWillMount() {
    this._loadData();
  }

  _loadData = () => {
    this.props.dispatch(getCapsules());
  }

  _getCapsule = async (id: string) => {
    await this.props.dispatch(getCapsule(id));

    // calling this to update the read status of capsules in state
    this.props.dispatch(getCapsules());
    this.props.dispatch(NavigationActions.navigate(
      { routeName: 'CapsuleDetails' })
    );
  }

  render() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
    .cloneWithRows(this.props.capsuleItems.items);
    return (
      <View style={styles.container}>
        {this.props
          .capsuleItems
          .items
          .length  > 0 &&
        <ListView
          dataSource={dataSource}
          renderRow={(capsule) => 
          {
            if (moment(capsule.publishedAt).isBefore()){
              return(
                <TouchableHighlight
                  onPress={() => this._getCapsule(capsule.id)} 
                >
                  <View style={styles.capsuleListItem}>
                    {capsule.read && 
                    <View>
                      <Icon 
                        name="ios-film-outline" 
                        size={30}
                        style={styles.capsuleIconEnabled}
                      />
                    </View>
                    ||
                    <View>
                      <Icon 
                        name="ios-film" 
                        size={30}
                        style={styles.capsuleIconEnabled}
                      />
                    </View>
                    }
                    <View style={styles.capsuleItemText}>
                      <Text style={styles.capsuleListItemPublished}>
                        Published {moment(capsule.publishedAt).fromNow()}
                      </Text>
                      <Text style={styles.capsuleListItemCreated}>
                        Created {moment(capsule.savedAt).fromNow()}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              );
            } else {
              return (
                <View style={styles.capsuleListItem}>
                  <View>
                    <Icon 
                      name="ios-film" 
                      size={30}
                      style={styles.capsuleIconDisabled}
                    />
                  </View>
                  <View style={styles.capsuleItemText}>
                    <Text style={styles.capsuleListItemNotPublished}>
                      Published {moment(capsule.publishedAt).fromNow()}
                    </Text>
                    <Text style={styles.capsuleListItemCreated}>
                      Created {moment(capsule.savedAt).fromNow()}
                    </Text>
                  </View>
                </View>
              );
            }
          }}
        />
        }
      </View>
    );
  }

}

CapsuleListScreen.propTypes = {
  dispatch:       PropTypes.func.isRequired,
  capsuleItems:   PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    capsuleItems: state.capsuleItems
  }
}

export default connect(mapStateToProps)(CapsuleListScreen);
