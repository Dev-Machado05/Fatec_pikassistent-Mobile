import getScreenSize from "@/assets/helper/getScreenSize";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PokedexCarroussel from "./components/homePokedexCarroussel/homePokedexCarroussel";
import { useRouter } from "expo-router";

type recentItemsList = {
  recentOption: { url: string };
};

export default function home() {
  const router = useRouter();
  // const navigation = useNavigation<NavigationProp<recentItemsList>>();
  const [searchItem, setSearchItem] = useState<string>("");
  const [recentAccess, setRecentAccess] = useState<
    Array<{ name: string; url: string }>
  >([]);
  const [fetchedRecent, setFetchedRecent] = useState<boolean>(false);
  const [mostRecentMessage, setMostRecentMessage] = useState<String>("");
  const [recentMessageError, setRecentMessageError] = useState<{
    state: boolean;
    message: String;
  }>({ state: false, message: "" });
  const [fetchedRecentMessages, setFetchedRecentMessages] =
    useState<boolean>(true);

  useEffect(() => {
    async function getRecentMessage() {
      try {
        let resp = await fetch("");
        if (resp.ok) {
          let data = await resp.json();
          if (data.success) {
            setMostRecentMessage(data.message);
            setFetchedRecentMessages(false);
            if (recentMessageError.state) {
              setRecentMessageError({ state: false, message: "" });
            }
          }
        }
      } catch (error) {
        setRecentMessageError({
          state: true,
          message: "Erro ao buscar mensagem...",
        });
        setFetchedRecentMessages(false);
      }
    }

    getRecentMessage();
  }, []);

  // get the recent access
  useEffect(() => {
    async function getRecentAccess() {
      let tempRecentAccess;
      try {
        tempRecentAccess = await AsyncStorage.getItem("recentAccess");
      } catch {
        tempRecentAccess = null;
      }

      if (tempRecentAccess != null && JSON.parse(tempRecentAccess) !== "") {
        try {
          setRecentAccess(JSON.parse(tempRecentAccess));
        } catch (err) {
          console.error("erro ao coletar o histórico: " + err);
        }
      } else {
        setRecentAccess([]);
      }
    }
    getRecentAccess().then(() => {  // change this logic
      setRecentAccess([
        { name: "pokedex", url: "/Pokedex" },
        { name: "chatGlobal", url: "/chatGlobal" },
        { name: "chatBot", url: "/chatBot" },
        { name: "qual é esse pokemon?", url: "/game" },
        { name: "ranking qual é esse pokemon?", url: "/ranking" }
      ]);
      setFetchedRecent(true);
    });
  }, []);

  function getRecentAccessImage(name: String) {
    switch (name) {
      case "pokedex":
        return require("../../assets/images/pokedexIcon.png");
      case "chatGlobal":
        return require("../../assets/images/chatDefault.png");
      case "chatBot":
        return require("../../assets/images/premierball.png");
      case "qual é esse pokemon?":
        return require("../../assets/images/premierball.png");
      case "ranking qual é esse pokemon?":
        return require("../../assets/images/premierball.png");
      case "build":
        return require("../../assets/images/premierball.png");
      default:
        return require("../../assets/images/premierball.png");
    }
  }

  return (
    <View style={styles.homeContainer}>
      <ImageBackground
        source={require("../../assets/images/Bg2.png")}
        style={styles.mainHeroContainer}
        resizeMode="cover"
      >
        <View style={styles.homeSearchBarContainer}>
          <TextInput
            onChangeText={(text) => {
              setSearchItem(text);
            }}
            style={styles.searchBarInput}
            placeholder="Search"
          />
          <Feather
            name="search"
            size={20}
            color="black"
            style={styles.searchBarIcon}
            onPress={() => {
              /*Search function*/
            }}
          />
        </View>
        <View style={styles.fastAccessContainer}>
          <Text style={styles.fastAccessTitle}>Acessados Recentemente:</Text>
          <View style={styles.recentAccessContainer}>
            {fetchedRecent ? (
              recentAccess != null && recentAccess.length > 0 ? (
                recentAccess.map((value, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      router.push(value.url as any);
                    }}
                    style={styles.recentAccessItemContainer}
                  >
                    <Image
                      source={getRecentAccessImage(value.name)}
                      style={styles.recentAccessItemImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.recentAccessItemName}>
                      {value.name}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text>histórico vazio...</Text>
              )
            ) : (
              <Text>Carregando histórico...</Text>
            )}
          </View>

          <Text style={styles.fastAccessTitle}>Acessados Recentemente:</Text>
          <View style={styles.recentMessageContainer}>
            <Text
              style={
                recentMessageError.state
                  ? styles.errorRecentMessageText
                  : styles.recentMessageText
              }
            >
              {!fetchedRecentMessages ? (
                recentMessageError.state ? (
                  recentMessageError.message
                ) : (
                  mostRecentMessage
                )
              ) : (
                <Text>Carregando...</Text>
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.pokedexTitle}>Pokedex:</Text>
        <PokedexCarroussel />
      </ImageBackground>
      <Text>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth. Even the all-powerful
        Pointing has no control about the blind texts it is an almost
        unorthographic life One day however a small line of blind text by the
        name of Lorem Ipsum decided to leave for the far World of Grammar. The
        Big Oxmox advised her not to do so, because there were thousands of bad
        Commas, wild Question Marks and devious Semikoli, but the Little Blind
        Text didn’t listen. She packed her seven versalia, put her initial into
        the belt and made herself on the way. When she reached the first hills
        of the Italic Mountains, she had a last view back on the skyline of her
        hometown Bookmarksgrove, the headline of Alphabet Village and the
        subline of her own road, the Line Lane. Pityful a rethoric question ran
        over her cheek, then
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
  mainHeroContainer: {
    flex: 1,
    height: getScreenSize("height") * 0.85,
    width: getScreenSize("width"),
    alignItems: "center",
    paddingVertical: 15,
  },
  homeSearchBarContainer: {
    width: "auto",
    marginHorizontal: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBarIcon: {
    margin: 1,
  },
  searchBarInput: {
    width: "90%",
    backgroundColor: "tranparent",
    fontSize: 15,
  },

  // fastAccess
  fastAccessContainer: {
    marginTop: "5%",
    backgroundColor: "rgba(39, 37, 51, 0.3)",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    width: "85%",
    padding: "5%",
    alignItems: "center",
    gap: 25,
  },
  fastAccessTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  recentAccessContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2C2A3E",
    paddingVertical: 15,
    borderRadius: 10,
  },
  recentAccessItemContainer: {
    alignItems: "center",
  },
  recentAccessItemImage: {
    height: 50,
    width: 50,
  },
  recentAccessItemName: {
    color: "#ffffff",
  },

  recentMessageContainer: {
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
  },
  recentMessageText: {
    fontSize: 14,
    color: "black",
  },
  errorRecentMessageText: {
    fontSize: 14,
    fontWeight: "500",
    color: "red",
  },

  pokedexTitle: {
    marginTop: 20,
    marginBottom: 10,
    width: "80%",
    fontSize: 18,
    fontWeight: "600",
  },
});
