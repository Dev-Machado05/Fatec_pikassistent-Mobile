import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import useAuth from "@/assets/hooks/useAuth";
import { useRouter } from "expo-router";

export default function cardInventory() {
  const router = useRouter();
  const API_URL = (
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:7070"
  ).replace(/\/$/, "");
  const [cardsList, setCardsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { userID } = useAuth();

  useEffect(() => {
    async function getCardList() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/users/${userID}/cards`);
        const data = await res.json();

        console.log(data);
        setCardsList(data.inventory);
      } catch (error) {
        console.error(error);
        setCardsList([]);
      } finally {
        setLoading(false);
      }
    }

    if (userID) {
      getCardList();
    }
  }, [userID]);

  return (
    <View style={styles.cardInventoryContainer}>
      <Text style={styles.cardInventoryTitle}>Minhas Cartas</Text>
      <View style={styles.cardInventoryNavBar}>
        <Pressable style={styles.filterContainer}>
          <Image
            source={require("../../assets/images/filter.png")}
            style={styles.filterIcon}
          />
          <Text style={styles.filterLabel}>Filtro</Text>
        </Pressable>
        <SearchBar />
      </View>
      <View style={styles.cardInventoryContent}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : cardsList.length > 0 ? (
          cardsList.map((card, index) => (
            <View key={card.id ?? index} style={styles.cardContainer}>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Image
                source={{ uri: card.image }}
                resizeMode={"contain"}
                style={styles.cardImage}
              />
              <View style={styles.cardInfoContainer}>
                <Text style={styles.cardText}>
                  {card.rarity ? card.rarity : "unset"}
                </Text>
                <Text style={styles.cardText}>{card.quantity}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text>Nenhuma carta encontrada</Text>
        )}
      </View>
    </View>
  );
}

function SearchBar() {
  return (
    <View style={styles.searchBarContainer}>
      <Image
        source={require("../../assets/images/filter.png")}
        style={styles.searchBarIcon}
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Pesquisar"
        placeholderTextColor="#888888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardInventoryContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 25,
    gap: 25,
  },
  cardInventoryTitle: {
    fontSize: 30,
    color: "#000000",
  },
  cardInventoryNavBar: {
    width: "100%",
    gap: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filterIcon: {
    height: 25,
    width: 25,
  },
  filterLabel: {
    fontSize: 15,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
  },
  searchBarIcon: {
    height: 20,
    width: 20,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 15,
    color: "#000000",
  },
  cardInventoryContent: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "flex-start",
    paddingHorizontal: 16,
  },
  cardTitle: {},
  cardContainer: {
    width: "48%",
    padding: 15,
    marginBottom: 16,
    gap: 13,
  },
  cardImage: {
    width: "100%",
    aspectRatio: 0.72,
  },
  cardInfoContainer: {
    gap: 5,
  },
  cardText: {
    textAlign: "center",
  },
});
