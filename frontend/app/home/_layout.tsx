import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, Slot } from "expo-router";
import Header from "@/assets/globalComponents/Header/Header";
import SideBar from "@/assets/globalComponents/sideBar/sideBar";

export default function _layout() {
  const [menuState, setMenuState] = useState<boolean>(false);
  const insets = useSafeAreaInsets();
  const handleMenuPress = () => {
    setMenuState(!menuState);
  };

  return (
    <View style={styles.homeContainer}>
      <Header onMenuPress={handleMenuPress} />
      <ScrollView style={styles.homeContent}>
        <SideBar pressedMenuButton={menuState} />
        <Slot />
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <Pressable
          style={styles.footerButtonContainer}
          onPress={() => {
            router.push("/");
          }}
        >
          <Image
            source={require("../../assets/images/pokedexIcon.png")}
            style={styles.footerButtonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.footerButtonContainer}
          onPress={() => {
            router.push("/chatBot" as any);
          }}
        >
          <Image
            source={require("../../assets/images/premierball.png")}
            style={styles.footerButtonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.footerButtonContainer}
          onPress={() => {
            router.push("/chatGlobal" as any);
          }}
        >
          <Image
            source={require("../../assets/images/chatDefault.png")}
            style={styles.footerButtonImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
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
  footer: {
    height: "auto",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#2C2A3E",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footerButtonContainer: {
    height: "auto",
    width: "auto",
  },
  footerButtonImage: {
    height: 60,
    width: 60,
  },
});
