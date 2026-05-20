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
import cardRarityTypes from "./helper/getCardsRarity";

export default function cardInventory() {
  const router = useRouter();
  const API_URL = (
    process.env.EXPO_PUBLIC_API_URL || "http://localhost:7070"
  ).replace(/\/$/, "");
  const [cardsList, setCardsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  const { userID } = useAuth();
  
  const rarityOptions = cardRarityTypes.map((r) => String(r).toLowerCase());

  const filteredCards = cardsList
    .filter((card) => {
      const name = String(card.name ?? "").toLowerCase();
      const rarity = String(card.rarity ?? "").toLowerCase();
      const query = search.trim().toLowerCase();

      const matchesSearch = !query || name.includes(query);
      const matchesRarity = rarityFilter === "all" || rarity === rarityFilter;

      return matchesSearch && matchesRarity;
    })
    .sort((leftCard, rightCard) => {
      const leftName = String(leftCard.name ?? "").toLowerCase();
      const rightName = String(rightCard.name ?? "").toLowerCase();

      return sortOrder === "asc"
        ? leftName.localeCompare(rightName, "pt-BR")
        : rightName.localeCompare(leftName, "pt-BR");
    });

  useEffect(() => {
    async function getCardList() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/users/${userID}/cards`);
        const data = await res.json();

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
        <SearchBar value={search} onChangeText={setSearch} />
        <View style={styles.cardInventoryNavBarContent}>
          <Pressable
            style={styles.filterContainer}
            onPress={() => setSortOrder((current) => (current === "asc" ? "desc" : "asc"))}
          >
            <Image
              source={require("../../assets/images/sortIcon.png")}
              style={styles.filterIcon}
            />
            <Text style={styles.filterLabel}>
              Ordenar: {sortOrder === "asc" ? "Asc" : "Desc"}
            </Text>
          </Pressable>
          <View style={styles.filterWrapper}>
            <Pressable
              style={styles.filterContainer}
              onPress={() => setShowFilterMenu((s) => !s)}
            >
              <Image
                source={require("../../assets/images/filter.png")}
                style={styles.filterIcon}
              />
              <Text style={styles.filterLabel}>
                Filtro: {rarityFilter === "all" ? "Todos" : rarityFilter.charAt(0).toUpperCase() + rarityFilter.slice(1)}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      {showFilterMenu && (
        <View style={styles.filterPanel}>
          {rarityOptions.map((opt) => (
            <Pressable
              key={opt}
              style={styles.filterMenuItem}
              onPress={() => {
                setRarityFilter(opt);
                setShowFilterMenu(false);
              }}
            >
              <View style={styles.radioOuter}>
                {opt === rarityFilter && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.filterMenuLabel}>
                {opt === 'all' ? 'Todos' : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      <View style={styles.cardInventoryContent}>
        {loading ? (
          <Text>Carregando...</Text>
        ) : filteredCards.length > 0 ? (
          filteredCards.map((card, index) => (
            <View key={card.id ?? index} style={styles.cardContainer}>
              <Text style={styles.cardTitle}>{card.name}</Text>
              <Image
                source={{ uri: card.image }}
                resizeMode={"contain"}
                style={styles.cardImage}
                alt={`imagem ${card.name}`}
              />
              <View style={styles.cardInfoContainer}>
                <Text style={styles.cardText}>
                  Raridade:{" "}
                  <Text style={styles.cardTextHightLight}>
                    {card.rarity ? card.rarity : "unset"}
                  </Text>
                </Text>
                <Text style={styles.cardText}>
                  Quantidade:{" "}
                  <Text style={styles.cardTextHightLight}>{card.quantity}</Text>
                </Text>
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

function SearchBar({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) {
  return (
    <View style={styles.searchBarContainer}>
      <Image
        source={require("../../assets/images/searchIcon.png")}
        style={styles.searchBarIcon}
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Pesquisar"
        placeholderTextColor="#888888"
        value={value}
        onChangeText={onChangeText}
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
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  cardInventoryNavBarContent: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    flexDirection: "row",
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
  filterWrapper: {
    position: "relative",
  },
  filterMenu: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 8,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  filterMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    width: "48%",
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#444444",
  },
  filterMenuLabel: {
    fontSize: 14,
  },
  filterPanel: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 12,
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
  cardTitle: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
  },
  cardContainer: {
    width: "48%",
    padding: 15,
    marginBottom: 16,
    gap: 13,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    aspectRatio: 0.72,
  },
  cardInfoContainer: {
    width: "100%",
    alignItems: "flex-start",
    gap: 3,
  },
  cardText: {
    textAlign: "center",
  },
  cardTextHightLight: {
    fontWeight: "600",
  },
});
