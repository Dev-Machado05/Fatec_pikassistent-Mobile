import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Pokedex() {
  return (
    <View style={styles.container}>
      <Text>Pokedex</Text>
      <Link href="/Pokedex/1">Go to Pokemon 1</Link>
      <Link href="/Pokedex/2">Go to Pokemon 2</Link>
      <Link href="/Pokedex/3">Go to Pokemon 3</Link>
    </View>
    // TODO:
    // Puxar IDs do pokeapi.co e gerar links dinamicamente
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
