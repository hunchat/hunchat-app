import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Feed } from '../components/Feed';


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Feed navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default withNavigation(HomeScreen);
