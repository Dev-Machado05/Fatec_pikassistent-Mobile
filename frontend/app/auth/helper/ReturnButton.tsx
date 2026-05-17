import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import getInsets from "@/assets/hooks/getInsets";

export default function ReturnButton() {
  const router = useRouter();
  const insets = getInsets;
  return (
    <View style={{marginTop: insets("top")}}>
      <Pressable  
        onPress={() => {
          router.push("/landingPage");
        }}
        style={styles.authReturnButtonContainer}
      >
        <Text style={styles.authReturnButtonText}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  authReturnButtonContainer: {
    position: "absolute",
    marginTop: "20%",
    marginLeft: 20,
    zIndex: 1,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#f8752f",
    padding: 15,
  },
  authReturnButtonText: {
    fontSize: 18,
    color: "#000000",
  },
});
