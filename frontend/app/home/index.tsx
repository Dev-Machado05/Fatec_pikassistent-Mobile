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
import { BlurView } from "expo-blur";
import PokedexCarroussel from "./components/homePokedexCarroussel/homePokedexCarroussel";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/assets/services/firebaseConfig";
import useAuth from "@/assets/hooks/useAuth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


type recentItemsList = {
  recentOption: { url: string };
};


export default function home() {
  const router = useRouter();
  const API_URL = (process.env.EXPO_PUBLIC_API_URL || "http://localhost:7070").replace(/\/$/, "");
  const [searchItem, setSearchItem] = useState<string>("");
  const [recentAccess, setRecentAccess] = useState<
    Array<{ name: string; url: string; id: string }>
  >([]);
  const [fetchedRecent, setFetchedRecent] = useState<boolean>(false);
  const [mostRecentMessage, setMostRecentMessage] = useState<String>("");
  const [recentMessageError, setRecentMessageError] = useState<{
    state: boolean;
    message: String;
  }>({ state: false, message: "" });
  const [fetchedRecentMessages, setFetchedRecentMessages] = useState<boolean>(true);
  const [raffleImage, setRaffleImage] = useState<string>("");
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [userInventoryLoading, setUserInventoryLoading] = useState<boolean>(false);

  // Pegue userID e userName diretamente do hook
  let { userID, userName } = useAuth();

  useEffect(() => {
    async function getUserToken() {
      if (!userID) return;
      const res = await fetch(`${API_URL}/api/users/${userID}/tokens`);
      const data = await res.json();
      setTokenAmount(data.tokens + 50);
    }
    getUserToken();
  }, [userID]);

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
    getRecentAccess().then(() => {
      // change this logic Maximun of 3 recent pages
      setRecentAccess([
        // { name: "pokedex", url: "/Pokedex", id:"pokedex" },
        // { name: "chatGlobal", url: "/chatGlobal", id: "chatGlobal" },
        { name: "chatBot", url: "/chatBot", id: "chatBot" },
        { name: "pokeQuiz", url: "/game", id: "pokemonQuiz" },
        { name: "ranking pokeQuiz", url: "/ranking", id: "rankingPokemonQuiz" },
      ]);
      setFetchedRecent(true);
    });
  }, []);

  // get a random card
  useEffect(() => {
    async function getRaffleImage() {
      try {
        const res = await fetch("https://api.carddex.dev/v1/cards/random");
        const data: any = await res.json();
        setRaffleImage(data?.data?.image_url || "");
      } catch (err) {
        setRaffleImage("");
      }
    }

    getRaffleImage();
  }, []);

  function getRecentAccessImage(identifier: String) {
    switch (identifier) {
      case "pokedex":
        return require("../../assets/images/pokedexIcon.png");
      case "chatGlobal":
        return require("../../assets/images/chatDefault.png");
      case "chatBot":
        return require("../../assets/images/premierball.png");
      case "pokemonQuiz":
        return require("../../assets/images/premierball.png");
      case "rankingPokemonQuiz":
        return require("../../assets/images/premierball.png");
      case "build":
        return require("../../assets/images/premierball.png");
      default:
        return require("../../assets/images/premierball.png");
    }
  }

  async function handleRollCard() {
    console.log("comando iniciado")
    console.log(userID)
    try {
      if (!userID) {
        console.warn('Id do usuário não encontrado.');
        return;
      }

      console.log("iniciando fetch")
      const response = await fetch(`${API_URL}/api/rollCard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userID,
          token: tokenAmount,
        }),
      });

      console.log("final fetch")
      let data: any = null;
      if (response.ok) {
        data = await response.json();
        // backend returns card in `cardResp` with `image` or `imagem`
        const img = data?.cardResp?.image || data?.cardResp?.imagem || data?.data?.image_url || '';
        console.log("arrumando imagem")
        setRaffleImage(img || '');
        // Atualiza o tokenAmount com o valor retornado do backend, se existir
        if (typeof data.tokenAmount === 'number') {
          setTokenAmount(data.tokenAmount);
        }
      } else {
        // tenta extrair mensagem de erro do backend
        let errorMsg = `HTTP error! status: ${response.status}`;
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMsg = errData.error;
          }
        } catch (e) {
          // resposta não era JSON
        }
        console.error("Erro ao sortear carta:", errorMsg);
        setRaffleImage("");
        // Opcional: exibir erro para o usuário
        // alert(errorMsg);
      }
    } catch (error) {
      console.error("Erro ao sortear carta:", error);
      setRaffleImage("");
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
                      source={getRecentAccessImage(value.id)}
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
      <View style={styles.tcgCardStoreContainer}>
        <Text style={styles.tcgCardStoreTitle}>TCG Card Store:</Text>
        <Text style={styles.tcgCardStoreIntro}>Far far away, behind the word mountains</Text>
        <Pressable style={styles.raffleContainer} onPress={() => {console.log("buttonPressed");handleRollCard()}} /*disabled={!userID}*/>
          <ImageBackground
            source={
              raffleImage && raffleImage.length > 0
                ? { uri: raffleImage }
                : require("../../assets/images/premierball.png") // imagem temporária, trocar + para frente
            }
            style={styles.raffleBackground}
            resizeMode="cover"
          >
            <BlurView intensity={70} tint="light" style={styles.raffleBlur} />
          </ImageBackground>
        </Pressable>
      </View>
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
    width: "auto",
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2C2A3E",
    paddingVertical: 15,
    borderRadius: 10,
  },
  recentAccessItemContainer: {
    width: "30%",
    alignItems: "center",
  },
  recentAccessItemImage: {
    height: 50,
    width: 50,
  },
  recentAccessItemName: {
    maxWidth: 120,
    textAlign: "center",
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
  tcgCardStoreContainer: {},
  tcgCardStoreTitle: {},
  tcgCardStoreIntro: {},
  raffleContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  raffleBackground: {
    width: 201,
    height: 284,
    mixBlendMode: "luminosity",
    filter: "grayscale(100%)",
    borderRadius: 5,
    overflow: "hidden",
  },
  raffleBlur: {
    ...StyleSheet.absoluteFillObject,
  },
});
