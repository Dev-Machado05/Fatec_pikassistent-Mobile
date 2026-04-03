import Header from "@/assets/globalComponents/Header/Header";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";
import { Slot } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function _layout() {
  const [pressedMenuButton, setPressedMenuButton] = useState<boolean>(false);

  const handleMenuPress = () => {
    setPressedMenuButton(!pressedMenuButton);
  };

  return (
    <View style={styles.chatBotContainer}>
      <Header onMenuPress={handleMenuPress} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.chatBotContent}
        contentContainerStyle={styles.chatBotContentContainer}
      >
        <SideBar isVisible={pressedMenuButton} />
        <Slot />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chatBotContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 0,
  },
  chatBotContent: {
    flex: 1,
  },
  chatBotContentContainer: {
    flexGrow: 1,
  },
});
