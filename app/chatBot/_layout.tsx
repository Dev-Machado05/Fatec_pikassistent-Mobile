import { ScrollView, StyleSheet, View, Alert, Image, Text } from "react-native";
import React, { useState } from "react";
import { Slot } from "expo-router";
import Header from "@/assets/globalComponents/Header/Header";
import Footer from "@/assets/globalComponents/FooterInput/FooterInput";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";

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
        <SideBar pressedMenuButton={pressedMenuButton}/>
        <Slot />
      </ScrollView>
      <Footer />
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
