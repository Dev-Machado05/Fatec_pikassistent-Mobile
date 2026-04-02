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

export default function Footer({
  reqFunction,
  type,
}: {
  reqFunction: Function;
  type: "chatBot" | "chatGlobal";
}) {
  const [writtedText, setWrittedText] = useState<String>("");
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.footerInputContainer, { paddingBottom: insets.bottom }]}>
      <TextInput
          style={styles.footerTextInput}
          onChangeText={(text) => {
            setWrittedText(text);
          }}
          placeholder="Digite sua pergunta"
          placeholderTextColor="#999"
        />
        <Pressable
          onPress={() => {
            reqFunction(writtedText)
          }}
          style={styles.footerSubmitButton}
        >
          <Text style={{ color: "#fff" }}>Enviar</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footerInputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 9,
    backgroundColor: "#2790b1",
  },
  footerTextInput: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  footerSubmitButton: {
    marginLeft: 10,
    backgroundColor: "#ff7a29",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 6,
  },
});
