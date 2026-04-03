import { Image, Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import getInsets from '@/assets/hooks/getInsets';


export default function FastAccess() {
    
  return (
    <View style={[styles.footer, { paddingBottom: getInsets("bottom") }]}>
            <Pressable
              style={styles.footerButtonContainer}
              onPress={() => {
                router.push("/Pokedex" as any);
              }}
            >
              <Image
                source={require("../../images/pokedexIcon.png")}
                style={styles.footerButtonImage}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={styles.footerButtonContainer}
              onPress={() => {
                router.push("/chatBot" as any);
              }}
            >
              <Image
                source={require("../../images/premierball.png")}
                style={styles.footerButtonImage}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              style={styles.footerButtonContainer}
              onPress={() => {
                router.push("/chatGlobal" as any);
              }}
            >
              <Image
                source={require("../../images/chatDefault.png")}
                style={styles.footerButtonImage}
                resizeMode="contain"
              />
            </Pressable>
          </View>
  )
}

const styles = StyleSheet.create({
    footer: {
    height: "auto",
    width: "100%",
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#2C2A3E",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footerButtonContainer: {
    height: "auto",
    width: "auto",
  },
  footerButtonImage: {
    height: 60,
    width: 60,
  },
})