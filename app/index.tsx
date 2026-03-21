import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// deixar o tokem com esta estrutura
// type token = {
//   id: String,
//   email: String
// }

type possibleTargets = "/home" | "/landingPage";

export default function index() {
  const [targetPage, setTargetPage] = useState<possibleTargets | null>(null);

  useEffect(() => {
    async function verifyConnection() {
      try {
        let token = await AsyncStorage.getItem("userToken");
        let val = true; // validar tokem no back via api

        if (!token) {
          setTargetPage("/landingPage");
        }

        if (val) {
          setTargetPage("/home");
        } else {
          await AsyncStorage.setItem("recentAccess", "[]")
          setTargetPage("/landingPage");
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
