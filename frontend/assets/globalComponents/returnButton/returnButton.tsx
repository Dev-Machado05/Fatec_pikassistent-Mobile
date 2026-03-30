import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function returnButton() {
  const router = useRouter();
  useEffect(() => {});
  return (
    <Link href={'/home'} style={styles.returnButtonContainer} asChild> 
      <View style={styles.returnButtonContent}>
        <Feather
          name="arrow-left"
          size={20}
          color={"black"}
          style={styles.returnButtonIcon}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.returnButtonText}>Voltar:</Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  returnButtonContainer: {},
  returnButtonContent: {},
  returnButtonIcon: {},
  returnButtonText: {},
});
