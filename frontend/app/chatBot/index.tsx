import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardEvent,
  Platform,
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
  const translateY = useRef(new Animated.Value(0)).current;
  const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://localhost:7070").replace(/\/$/, "");

  useEffect(() => {
    const animateInput = (toValue: number, duration: number) => {
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

      animateInput(-offset, event.duration ?? 250);
    };

    const onKeyboardHide = (event: KeyboardEvent) => {
      animateInput(0, event.duration ?? 250);
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

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  function sendMessage() {
    if (!inputText.trim()) return;

      console.log('1️⃣ Mensagem enviada:', inputText);
      console.log('2️⃣ API_URL:', API_URL);

    const newMessage = {
      message: inputText,
      sender: "user",
      id: generateId(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputText("");

    console.log('3️⃣ Fazendo fetch para:', `${API_URL}/api/chat`);

    fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: inputText }),
    })
      .then((res) => {
        console.log('4️⃣ Resposta recebida, status:', res.status);
        if (!res.ok) {
          throw new Error("HTTP error " + res.status);
        }
        return res.json();
      })
      .then((data) => {
        console.log('5️⃣ Data recebida:', data);
        setMessages((prev) => [
          ...prev,
          {
            message: data.response || "Erro na resposta",
            sender: "bot",
            id: generateId(),
          },
        ]);
      })
      .catch((err) => {
        console.log('6️⃣ Erro:', err);
        setMessages((prev) => [
          ...prev,
          {
            message: "Erro ao conectar com servidor",
            sender: "bot",
            id: generateId(),
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

    <Animated.View
      style={[
        styles.inputArea,
        { paddingBottom: insets.bottom, transform: [{ translateY }] },
      ]}
    >
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Digite sua mensagem..."
      />

      <TouchableOpacity style={styles.button} onPress={sendMessage}>
        <Text style={{ color: "#fff" }}>Enviar</Text>
      </TouchableOpacity>
    </Animated.View>
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
    marginBottom: 9,
  },
  
  button: {
    marginLeft: 10,
    backgroundColor: "#ff7a29",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 6,
    marginBottom: 9,
  },
});
