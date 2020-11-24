import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ListPreview from './ListPreview';

const lists = [
  {
    id: '1',
    name: 'Todas as Listas'
  },
  {
    id: '2',
    name: 'Lista Design'
  },
  {
    id: '3',
    name: 'Lista Amigos'
  },
  {
    id: '4',
    name: 'Lista Culinária'
  },
  {
    id: '5',
    name: 'Lista Gaming'
  },
  {
    id: '6',
    name: 'Lista Desporto'
  },
  {
    id: '7',
    name: 'Lista Livros'
  },
]


function Lists({
  navigation,
}) {

  const keyExtractor = (item) => item.id;

  const renderItem = ({ item }) => (
    <ListPreview {...item} navigation={navigation}/>
  );

  return (
    <FlatList
      data={lists}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.container}
      contentContainerStyle={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.column}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  list: {
    justifyContent: 'space-around',
  },
  column: {
    flexShrink: 1,
  },
})

export default Lists;
