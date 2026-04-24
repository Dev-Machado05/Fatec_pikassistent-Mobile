import Footer from "@/assets/globalComponents/FooterInput/FooterInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { auth, db } from "@/assets/services/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function index() {
  const [userID, setUserID] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://localhost:7070").replace(/\/$/, "");
  const insets = useSafeAreaInsets();

/* useEffect(() => {
    loadOrCreateUserSession();
  }, []); */

/*  useEffect(() => {    if (userID) {
      loadMessages();
    }
  }, [userID]);  */ 
  

  useEffect(() => {
    if (!userID) return; // Aguarda até que o userID seja definido

    const q = query(collection(db, "messages"), orderBy("timestamp", "desc"));
    

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id : doc.id,
        message: doc.data().text,
        senderID: doc.data().senderId,
        senderName: doc.data().senderName,
        Timestamp: doc.data().timestamp
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [userID]);


  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserID(currentUser.uid);
        const displayName = currentUser.displayName || currentUser.email?.split('@')[0] || 'Usuário';
        setUserName(displayName);
        console.log("Usuário autenticado:", displayName);
      } else {
        console.log("Nenhum usuário autenticado, usando sessão anônima.");
        loadOrCreateUserSession();
      }
    });
    return () => unsubscribeAuth();
    }, []);

  async function loadOrCreateUserSession() {
    try {
      let storedId = await AsyncStorage.getItem('userID');
      let storedName = await AsyncStorage.getItem('userName');

      if (!storedId) {
        storedId = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        storedName = `Visitor_${Math.floor(Math.random() * 1000)}`;

        await AsyncStorage.setItem('userID', storedId);
        await AsyncStorage.setItem('userName', storedName);
      }

      setUserID(storedId);
      setUserName(storedName || 'visitante');
    } catch (error) {
      console.error('Erro criando ou carregando sessão anônima:', error);

      setUserID(`temp_${Date.now()}`);
      setUserName('visitante');
    } 
  }

/*   async function sendMessage(text: string) {
    console.log("teste de função!!! " + text);
    if (!text.trim()) return; // Evita enviar mensagens vazias

    try {
      const response = await fetch(`${API_URL}/api/postMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userID,
          message: text,
          senderName: userName
        }),
      });

      if (response.ok) {
        await loadMessages(); // Recarrega as mensagens após enviar
      }
    } catch (error) {
      console.error('Erro enviando mensagem:', error);
    }
  } */ // antiga função de envio, sem integração com Firebase

  async function sendMessage(text: string) {
    console.log("Enviando mensagem:", text);
    if (!text.trim()) return; // Evita enviar mensagens vazias 

    const isUserLoggedIn = !!user; // Verifica se o usuário está autenticado
    const finalUserID = user.uid || userID; // Usa o UID do Firebase se disponível, caso contrário usa o ID da sessão anônima
    const finalUserName = user.displayName || userName; // Usa o displayName do Firebase se disponível, caso contrário usa o nome da sessão anônima

    console.log('enviar mensagem com: ${finalUserID} (${isUserLoggedIn ? "autenticado" : "anônimo"}) - ${finalUserName}');

    try {
      await addDoc(collection(db, "messages"), {
        text: text,
        senderId: userID,
        senderName: userName,
        timestamp: Date.now(),
        isAnonymous: !isUserLoggedIn
      });

      console.log("Mensagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro enviando mensagem:", error);
    }
  }

/*   async function loadMessages() {
    try {
      const response = await fetch(`${API_URL}/api/getMessage`);
      const result = await response.json();
      if (response.ok && result.success) {
         const formattedMessages = result.data.map((msg: any) => ({
        message: msg.text,
        senderID: msg.id,
        senderName: msg.senderName
      }));
      setMessages(formattedMessages);
      console.log('Mensagens carregadas:', formattedMessages);
      }
    } catch (error) {      
      console.error('Erro carregando mensagens:', error);
    }
  } */ // antiga função de carregamento, sem integração com Firebase. Não é mais necessária, pois o Firebase entrega as mensagens em tempo real via onSnapshot.

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
              <View style={styles.messageTextContainer}>
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
    maxWidth: "100%",
  },
  messageContainer: {
    alignSelf: "flex-start",
    flexDirection: "row-reverse",
    marginVertical: 10,
    maxWidth: "100%",
  },
  messageTextContainer: {
    alignItems: "flex-end"
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
    maxWidth: "75%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actUserMessageContent: {
    maxWidth: "75%",
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
