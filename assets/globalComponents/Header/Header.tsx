import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header({ onMenuPress }: { onMenuPress: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.chatBotHeader, { paddingTop: insets.top }]}>
      <Pressable style={styles.headerMenuContainer} onPress={onMenuPress}>
        <Image
          source={require("../../images/menuIcon.png")}
          style={styles.headerMenuImage}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chatBotHeader: {
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
});
