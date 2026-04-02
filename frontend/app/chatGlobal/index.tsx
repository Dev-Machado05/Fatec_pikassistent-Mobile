import Footer from "@/assets/globalComponents/FooterInput/FooterInput";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const [userID, setUserID] = useState<String>("001");
  const insets = useSafeAreaInsets();
  const messages = [
    {
      message: "random example text",
      senderID: "001",
      senderName: "user",
    },
    {
      message: "chat answer",
      senderID: "002",
      senderName: "bot",
    },
  ];

  function sendMessage(text: String) {
    console.log("teste de função!!! " + text);
    // TODO: implement the submit function here
  }

  return (
    <ImageBackground
      source={require("../../assets/images/Bg2.png")}
      style={styles.globalChatContainer}
    >
      <ScrollView style={styles.globalChatContent}>
        {messages.map((item, index) => (
          <View
            style={
              item.senderID === userID
                ? styles.actUserMessage
                : styles.messageContainer
            }
            key={index}
          >
            <View
              style={
                item.senderID === userID
                  ? styles.actUserMessageContent
                  : styles.messageContent
              }
            >
              <Image
                style={styles.userIcon}
                source={
                  require("../../assets/images/pika.png") // fetch user Image
                }
              />
              <View>
                <Text
                  style={
                    item.senderID === userID
                      ? styles.actUserName
                      : styles.userName
                  }
                >
                  {item.senderName}
                </Text>
                <Text
                  style={[
                    styles.userMessage,
                    item.senderID === userID
                      ? styles.actUserMessageText
                      : styles.otherUserMessageText,
                  ]}
                >
                  {item.message}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer
        reqFunction={sendMessage} // função a ser executada ao clicar no botão
        type="chatGlobal"
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  globalChatContainer: {
    flex: 1,
  },
  globalChatContent: {
    width: "100%",
    padding: 15,
    paddingBottom: 100,
  },
  actUserMessage: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginVertical: 10,
    maxWidth: "75%",
  },
  messageContainer: {
    alignSelf: "flex-start",
    flexDirection: "row-reverse",
    marginVertical: 10,
    maxWidth: "75%",
  },
  actUserName: {
    color: "#000000",
    paddingBottom: 5,
    alignSelf: "flex-end",
  },
  userName: {
    color: "#000000",
    paddingBottom: 5,
    alignSelf: "flex-start",
  },
  userMessage: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "#000000",
    padding: 12,
  },
  actUserMessageText: {
    backgroundColor: "#FD7932",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 8,
  },
  otherUserMessageText: {
    backgroundColor: "#347CEC",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 15,
  },
  userIcon: {
    width: 40,
    height: 40,
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actUserMessageContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  footerInputArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#2e86ab",
  },
});
