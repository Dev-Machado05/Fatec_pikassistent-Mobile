import { Slot } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Header</Text>
      </View>
      <Slot/>
    </View>
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
    height: 70,
    backgroundColor: "#58A8C0",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
}); 