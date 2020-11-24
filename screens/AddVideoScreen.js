import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text } from 'react-native';


class AddVideoScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Video Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default withNavigation(AddVideoScreen);
