import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';


function Header({
  title,
  navigation,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.navigation}>
        <Icon name="person-outline" color="black" size={40} />
        <Icon name="email" color="black" size={40} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  titleContainer: {
    flex: 3,
  },
  title: {
    fontSize: 24,
  },
  navigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default Header;
