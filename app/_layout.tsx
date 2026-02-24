import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <Slot />
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
    // SafeAreaView é pra evitar que o conteúdo fique embaixo do notch ou da barra de navegação em alguns dispositivos
    // Eu não consigo testar isso ^ pq to pelo browser -Vitor
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
}); 