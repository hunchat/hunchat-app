import React from 'react';
import { View } from 'react-native';
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
      <View style={{ flex: 1 }}>
        <Header title={this.props.name} navigation={this.props.navigation}/>
        <VideosList videosIds={this.props.videos} />
      </View>
    )
  }
};


const makeMapStateToProps = (state) => {
  const getList = makeGetList();
  return function mapStateToProps(state, ownProps) {
    let list = getList(state, { listId: ownProps.route.params.list.id });
    return {
      name: list.name,
      videos: list.videos,
    }
  }
};


export default withNavigation(connect(
  makeMapStateToProps,
)(ListScreen));
