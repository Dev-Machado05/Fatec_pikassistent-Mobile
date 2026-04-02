import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  function sendMessage() {
    if (!inputText.trim()) return;

    const newMessage = {
      message: inputText,
      sender: "user",
      id: crypto.randomUUID(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText("");

    fetch("http://10.0.2.2:7070/api/chat") // ⚠️ 
      .then((res) => res.json())
      .then((data) => {
        setMessages((prev) => [
          ...prev,
          {
            message: data.response || "Erro na resposta",
            sender: "bot",
            id: crypto.randomUUID(),
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            message: "Erro ao conectar com servidor",
            sender: "bot",
            id: crypto.randomUUID(),
          },
        ]);
      });
}
  return (
  <ImageBackground
    style={styles.chatBotContent}
    source={require("../../assets/images/Bg2.png")}
    resizeMode="cover"
  >
    <ScrollView contentContainerStyle={styles.messagesContainer}>
      {messages.map((item) => (
        <View
          key={item.id}
          style={
            item.sender === "user"
              ? styles.userMessagecontent
              : styles.botMessagecontent
          }
        >
          <Text
            style={[
              styles.messageText,
              item.sender === "user"
                ? styles.userMessageText
                : styles.botMessageText,
            ]}
          >
            {item.message}
          </Text>

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
      ))}
    </ScrollView>

    <View style={[styles.inputArea, {paddingBottom: insets.bottom}]}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Digite sua mensagem..."
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={{ color: "#fff" }}>Enviar</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);
}
const styles = StyleSheet.create({
  chatBotContent: {
    flex: 1,
  },

  messagesContainer: {
    padding: 15,
    paddingBottom: 100,
  },

  userMessagecontent: {
    alignSelf: "flex-end",
    flexDirection: "row",
    marginVertical: 10,
  },

  botMessagecontent: {
    alignSelf: "flex-start",
    flexDirection: "row-reverse",
    marginVertical: 10,
  },

  messageText: {
    color: "#fff",
    padding: 12,
  },

  userMessageText: {
    backgroundColor: "#FD7932",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 10,
  },

  botMessageText: {
    backgroundColor: "#347CEC",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 15,
  },

  messageIcon: {
    width: 40,
    height: 40,
  },

  inputArea: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#2e86ab",
  },

  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  button: {
    marginLeft: 10,
    backgroundColor: "#ff7a29",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 6,
  },
});
