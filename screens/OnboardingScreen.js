import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import ViewPager from "@react-native-community/viewpager";

import { Page1, Page2, Page3 } from "../components/Onboarding";
import { Colors } from "../styles";

const OnboardingScreen = (navigation) => {
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={styles.container}>
      <ViewPager ref={pagerRef} scrollEnabled={false} style={{ flex: 1 }}>
        <View key="1">
          <Page1 handlePageChange={() => handlePageChange(1)} />
        </View>
        <View key="2">
          <Page2 handlePageChange={() => handlePageChange(2)} />
        </View>
        <View key="3">
          <Page3 />
        </View>
      </ViewPager>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBackground,
  },
});

export default withNavigation(OnboardingScreen);
