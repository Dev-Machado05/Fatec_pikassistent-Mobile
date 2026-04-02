import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import getSideMenuItems from "@/assets/hooks/getSideMenuItems";
import { router } from "expo-router";

export default function SideBar({
  pressedMenuButton,
}: {
  pressedMenuButton: boolean;
}) {
  return (
    <View
      style={[
        styles.sideBarContainer,
        { display: pressedMenuButton ? "flex" : "none" },
      ]}
    >
      {getSideMenuItems().map((item, index) => (
        <Pressable key={index} style={styles.sideBarContent} onPress={() => {
            router.push(item.link as any);
        }}>
          <Image source={item.Icon} resizeMode="contain" style={styles.sideBarIcon} />
          <Text style={styles.sideBarTitle}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sideBarContainer: {
    position: "absolute",
    zIndex: 1,
    backgroundColor: "#9DC8D5",
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "black",
    borderBottomRightRadius: 10,
    width: "50%",
    height: "auto",
    padding: 10,
    gap: 10,
  },
  sideBarContent: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sideBarIcon: { height: 35, width: 35},
  sideBarTitle: { fontSize: 15 },
});
