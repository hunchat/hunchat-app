import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


const spacing = 15;
const width = (Dimensions.get('window').width - 4 * 15) / 2;


function ListPreview({
  id,
  name,
  navigation,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
    </View>
  )
}

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
}

export default ListPreview;
