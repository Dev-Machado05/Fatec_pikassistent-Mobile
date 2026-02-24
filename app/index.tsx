import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function LandingPage() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Text>Hello niños!!</Text>
      <Link href="/Pokedex">To Pokedex</Link>
    </View>
  );
}
