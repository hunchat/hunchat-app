import React, { useRef } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Notification from "./Notification";

const NotificationsInbox = ({ notificationsIds }) => {
  const flatListRef = useRef(null);

  const keyExtractor = (item) => item;

  const renderItem = ({ item, index }) => (
    <Notification id={item}/>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={notificationsIds}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      initialNumToRender={7}
    />
  );
};

export default NotificationsInbox;
