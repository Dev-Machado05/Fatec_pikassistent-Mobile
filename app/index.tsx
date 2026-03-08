import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// deixar o tokem com esta estrutura
// type token = {
//   id: String,
//   email: String
// }

type possibleTargets = "/auth/login" | "/landingPage";

export default function index() {
  const [targetPage, setTargetPage] = useState<possibleTargets | null>(null);

  useEffect(() => {
    async function verifyConnection() {
      try {
        let token = await AsyncStorage.getItem("userToken");
        let val = true; // validar tokem no back via api

        if (!val) {
          setTargetPage("/landingPage");
        }

        if (!token) {
          setTargetPage("/landingPage");
        } else {
          setTargetPage("/auth/login"); // trocar para a home do usuário
        }
      } catch {
        setTargetPage("/landingPage");
      }
    }
    verifyConnection();
  }, []);

  if (!targetPage) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={targetPage} />;
}
