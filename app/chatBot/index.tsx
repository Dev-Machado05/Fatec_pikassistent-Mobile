import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const insets = useSafeAreaInsets();
  const [fetchedMessages, setFetchedMessages] = useState<boolean>(true);
  const messages = [
    {
      message: "random example text",
      sender: "user",
    },
    {
      message: "chat answer",
      sender: "bot",
    },
  ];
  return (
    <ImageBackground
      style={styles.chatBotContent}
      source={require("../../assets/images/Bg2.png")}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {fetchedMessages
          ? messages.map((item, index) => (
              <View
                style={
                  item.sender === "user"
                    ? styles.userMessagecontent
                    : styles.botMessagecontent
                }
                key={index}
              >
                <Text style={[styles.messageText, item.sender === "user" ? styles.userMessageText : styles.botMessageText]}>{item.message}</Text>
                {item.sender === "user" ? (
                  <Image
                    style={styles.messageIcon}
                    source={require("../../assets/images/masterBall.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={styles.messageIcon}
                    source={require("../../assets/images/pika.png")}
                    resizeMode="contain"
                  />
                )}
              </View>
            ))
          : null}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  chatBotContent: {
    height: "100%",
  },
  messagesContainer: {
    width: "100%",
    padding: 15,
    alignItems: "flex-start",
    gap: 20,
  },
  userMessagecontent: {
    width: "auto",
    alignSelf: "flex-end",
    flexDirection: "row",
},
botMessagecontent: {
    width: "auto",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    width: "auto",
    paddingVertical: 15,
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  userMessageText: {
    paddingLeft: 25,
    paddingRight: 40,
    backgroundColor: "#FD7932",
    borderWidth: 1,
    borderColor: "#000000",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 5,
  },
  botMessageText: {
    paddingLeft: 40,
    paddingRight: 25,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#347CEC",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 15,
  },
  messageIcon: {
    height: 50,
    width: 50,
  },
});