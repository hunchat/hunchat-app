import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="search" color="white" size={35} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    margin: 15,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
  }
})

export default SearchBar;
