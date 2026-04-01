import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput, TouchableOpacity,
  View,
  Platform
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from 'expo-constants';


const getApiUrl = () => {
  if (Platform.OS === 'android' && !Constants.isDevice) {
    return 'http://10.0.2.2:7070';
  }
  if ((Platform.OS === 'ios' && !Constants.isDevice) || Platform.OS === 'web') {
    return 'http://localhost:7070';
  }
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:7070';
};

const API_URL = getApiUrl();


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

    fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
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

    <View style={styles.inputArea}>
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
    borderRadius: 10,
  },

  botMessageText: {
    backgroundColor: "#347CEC",
    borderRadius: 10,
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
