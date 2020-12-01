import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import { makeGetListName } from '../../ducks/listsSlice';


const spacing = 15;
const width = (Dimensions.get('window').width - 4 * 15) / 2;


class ListPreview extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    this.props.navigation.push(
      "ListStack",
      {
        screen: "List",
        params: {
          list: {
            id: this.props.id,
          }
        }
      }
    )
  };

  render() {
    return (
      <TouchableOpacity key={this.props.id} style={styles.container} onPress={this.onPress}>
        <Text style={styles.name}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
};

const styles = {
  container: {
    backgroundColor: '#d3d3d3',
    height: 250,
    width: width,
    margin: spacing,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
  }
};


const makeMapStateToProps = (state) => {
  const getListName = makeGetListName();
  return function mapStateToProps(state, ownProps) {
    return {
      name: getListName(state, { listId: ownProps.id }),
    }
  }
};


export default connect(makeMapStateToProps)(ListPreview);
