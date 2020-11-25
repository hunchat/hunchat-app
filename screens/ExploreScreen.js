import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Header } from '../components/Header';
import { SearchBar } from '../components/Search';
import { VideosList } from '../components/Video';


class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={"Lista Geral"} navigation={this.props.navigation}/>
        <SearchBar />
        <VideosList navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})

export default withNavigation(ExploreScreen);
