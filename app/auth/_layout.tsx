import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function _layout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <Text>Weyy</Text>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <Text style={styles.footerText}>© 2025 Pikassistent, Pokémon and Pokémon character names are trademarks of Nintendo.</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "auto",
    backgroundColor: "#58A8C0",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    zIndex: 10,
    elevation: 10,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "auto",
    paddingTop: 5,
    padding: 10,
    backgroundColor: "#000000c2",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
  footerText: {
    color: "#ffffff"
  },
});
