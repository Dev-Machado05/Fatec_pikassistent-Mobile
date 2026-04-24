import {
  Animated,
  Image,
  Keyboard,
  KeyboardEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Footer({
  reqFunction,
  type,
}: {
  reqFunction: Function;
  type: "chatBot" | "chatGlobal";
}) {
  const [writtedText, setWrittedText] = useState<string>("");
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const animateFooter = (toValue: number, duration: number) => {
      Animated.timing(translateY, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const onKeyboardShow = (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      const offset = Platform.OS === "ios"
        ? Math.max(0, keyboardHeight - insets.bottom)
        : keyboardHeight;

      animateFooter(-offset, event.duration ?? 250);
    };

    const onKeyboardHide = (event: KeyboardEvent) => {
      animateFooter(0, event.duration ?? 250);
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      onKeyboardShow
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      onKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [insets.bottom, translateY]);

  return (
    <Animated.View
      style={[
        styles.footerInputContainer,
        { paddingBottom: insets.bottom, transform: [{ translateY }] },
      ]}
    >
      <TextInput
          style={styles.footerTextInput}
          value={writtedText}
          onChangeText={(text) => {
            setWrittedText(text);
          }}
          placeholder="Digite sua pergunta"
          placeholderTextColor="#999"
        />
        <Pressable
          onPress={() => {
            reqFunction(writtedText);
            setWrittedText("");
            Keyboard.dismiss();
          }}
          style={styles.footerSubmitButton}
        >
          <Text style={{ color: "#fff" }}>Enviar</Text>
        </Pressable>
    </Animated.View>
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
    marginBottom: 9
  },
  footerSubmitButton: {
    marginLeft: 10,
    backgroundColor: "#ff7a29",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 9
  },
});
