import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Slot } from "expo-router";
import Header from "@/assets/globalComponents/Header/Header";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";

export default function _layout() {
  const [pressedMenuButton, setPressedMenuButton] = useState<boolean>(false);

  const handleMenuPress = () => {
    setPressedMenuButton(!pressedMenuButton);
  };

  return (
    <View style={styles.cardInventoryContainer}>
      <Header onMenuPress={handleMenuPress} />
      <SideBar isVisible={pressedMenuButton} />
      <ScrollView
        style={styles.cardInventoryContent}
        contentContainerStyle={styles.cardInventoryContentContainer}
      >
        <Slot />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardInventoryContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 0,
  },
  cardInventoryContent: {
    flex: 1,
  },
  cardInventoryContentContainer: {
    flexGrow: 1,
  },
});
