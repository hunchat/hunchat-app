import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Header } from '../components/Header';
import { VideosList } from '../components/Video';

import { makeGetList } from '../ducks/listsSlice';


class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.props.name} navigation={this.props.navigation}/>
        <VideosList videosIds={this.props.videos} navigation={this.props.navigation}/>
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: ownProps.route.params.list.id });
    return {
      name: list.name,
      videos: list.videos,
    }
  }
}


export default withNavigation(connect(
  makeMapStateToProps,
)(ListScreen));
