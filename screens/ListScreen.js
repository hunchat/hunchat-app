import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { Header } from '../components/Header';
import { VideosList } from '../components/Video';


class ListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
      <Header title={this.props.name} navigation={this.props.navigation}/>
      <VideosList navigation={this.props.navigation}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

const makeMapStateToProps = () => {
  const mapStateToProps = (state, ownProps) => {
    return {
      name: ownProps.route.params.list.name,
    }
  }
  return mapStateToProps
}


export default withNavigation(connect(
  makeMapStateToProps,
)(ListScreen));
