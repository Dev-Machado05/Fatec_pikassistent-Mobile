import FastAccess from "@/assets/globalComponents/FooterFastAccess/FastAccess";
import Header from "@/assets/globalComponents/Header/Header";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";
import { Slot } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function _layout() {
  const [menuState, setMenuState] = useState<boolean>(false);
  const handleMenuPress = () => {
    setMenuState(!menuState);
  };
  return (
    <View style={styles.pokedexContainer}>
      <Header onMenuPress={handleMenuPress} />
      <View style={styles.pokedexContent}>
        <SideBar isVisible={menuState} />
        <Slot />
      </View>
      <FastAccess />
    </View>
  );
}

const styles = StyleSheet.create({
    pokedexContainer: {
        flex: 1,
        width: "100%"
    },
    pokedexContent: {
        flex: 1,
    },
});
