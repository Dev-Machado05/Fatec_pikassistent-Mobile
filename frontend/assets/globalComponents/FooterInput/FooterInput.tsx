import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer() {
  const [writtedText, setWrittedText] = useState<String>("");
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.chatBotFooter, { paddingBottom: insets.bottom }]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.chatBotInputContent}
          onChangeText={(text) => {
            setWrittedText(text);
          }}
          placeholder="Digite sua pergunta"
          placeholderTextColor="#999"
        />
        <Pressable
          onPress={() => {
            console.log("message: " + writtedText);
          }}
        >
          <Image
            source={require("../../images/sendIcon.png")}
            style={styles.sendIcon}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatBotFooter: {
    backgroundColor: "#2790b1",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    paddingHorizontal: 12,
    gap: 8,
  },
  chatBotInputContent: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: "#333",
  },
  sendIcon: {
    width: 24,
    height: 24,
  },
});
