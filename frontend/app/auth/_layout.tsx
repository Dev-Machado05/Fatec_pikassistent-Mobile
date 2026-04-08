import { Slot, useSegments } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const titleByRoute: Record<string, string> = {
  login: "Login",
  signUp: "Cadastro",
  forgotPassword: "Recuperar Senha",
};

export default function AuthLayout() {
  const insets = useSafeAreaInsets();
  const segments = useSegments();
  const routeName = segments[segments.length - 1];
  const title = titleByRoute[routeName] || "Autenticacao";

  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Slot />
      </View>
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          <Text style={styles.footerText}>© 2025 Pikassistent, Pokémon and Pokémon character names are trademarks of Nintendo.</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  headerTitle: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Open Sans"
  },
  content: {
    flex: 1,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "auto",
    backgroundColor: "#58A8C0",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    zIndex: 10,
    elevation: 10,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "auto",
    paddingTop: 5,
    padding: 10,
    backgroundColor: "#000000c2",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
  footerText: {
    color: "#ffffff"
  },
});
