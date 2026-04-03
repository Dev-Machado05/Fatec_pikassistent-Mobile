import FastAccess from "@/assets/globalComponents/FooterFastAccess/FastAccess";
import Header from "@/assets/globalComponents/Header/Header";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";
import { Slot } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View
} from "react-native";

export default function _layout() {
  const [menuState, setMenuState] = useState<boolean>(false);
  const handleMenuPress = () => {
    setMenuState(!menuState);
  };

  return (
    <View style={styles.homeContainer}>
      <Header onMenuPress={handleMenuPress} />
      <ScrollView style={styles.homeContent}>
        <SideBar isVisible={menuState} />
        <Slot />
      </ScrollView>
      <FastAccess />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
  homeHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#58A8C0",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  headerMenuContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#f8752f",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
  },
  headerMenuImage: {
    width: 26,
    height: 26,
    backgroundColor: "#f79b69",
    borderRadius: 50,
  },
  homeContent: {},
});
