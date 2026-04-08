import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PokemonList from "./components/PokemonList";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<any>(null);
  const [selectedPokemonID, setSelectedPokemonID] = useState<string>("1");
  const [pokemonImageSize, setPokemonImageSize] = useState({
    width: 96,
    height: 96,
  });

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemonID}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [selectedPokemonID]);

  const changeSelectedPokemon = (id: string) => {
    console.log(id);
    setSelectedPokemonID(id);
  };

  // image sprites options
  const pokemonImageUri =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites?.other?.showdown?.front_default ||
    pokemon?.sprites?.front_default;

  return (
    <ImageBackground
      source={require("../../assets/images/Bg2.png")}
      style={styles.container}
    >
      <Text style={styles.pokedexTitle}>Pokedex</Text>
      <View style={styles.topPokedexContainer}>
        <View style={styles.pokemonInfo}>
          <View style={styles.pokemonInfoRow}>
            <Text style={styles.pokemonTopText}>#{pokemon?.id ?? "-"}</Text>
            <Text style={styles.pokemonTopText}>
              {pokemon?.name ?? "Loading..."}
            </Text>
          </View>
          {pokemon?.sprites?.front_default && (
            <View style={styles.pokemonImageContainer}>
              <Image
                source={{ uri: pokemonImageUri }}
                style={[
                  styles.pokemonImage,
                  {
                    width: pokemonImageSize.width,
                    height: pokemonImageSize.height,
                  },
                ]}
                resizeMode="contain"
                onLoad={(event) => {
                  const { width, height } = event.nativeEvent.source;
                  if (!width || !height) return;

                  const maxSize = 90;
                  const scale = Math.min(maxSize / width, maxSize / height);

                  setPokemonImageSize({
                    width: Math.round(width * scale),
                    height: Math.round(height * scale),
                  });
                }}
              />
            </View>
          )}
          <Text style={styles.pokedexTopText}>Clique aqui para ver mais</Text>
        </View>
      </View>

      {/* TODO: add a function to search a specific pokemon */}
      <View style={styles.pokemonListContainer}>
        <View style={styles.pokemonSearchContainer}>
          <FontAwesome name="search" size={20} color="#e7775e" />
          <TextInput
            style={styles.pokedexSearchInput}
            placeholder="Procurar..."
            placeholderTextColor="#e7775e"
          />
        </View>
        <PokemonList onSelect={(id) => changeSelectedPokemon(id)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 20,
  },
  pokedexTitle: {
    fontSize: 23,
    fontWeight: "800",
    fontFamily: "serif",
  },

  // pokemon selecionado

  topPokedexContainer: {
    flex: 1,
    backgroundColor: "#1c242f5b",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 21,
  },
  pokemonInfo: {
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0F102C",
    height: "100%",
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#e7775e",
    padding: 16,
    width: "100%",
  },
  pokemonInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderRadius: 12,
    marginBottom: 12,
  },
  pokemonTopText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "capitalize",
  },
  pokemonImageContainer: {
    backgroundColor: "#262740",
    borderRadius: 12,
    padding: 8,
    width: "100%",
    alignItems: "center",
  },
  pokemonImage: {
    width: 96,
    height: 96,
  },
  pokedexTopText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },

  ///
  // pokemon List container

  pokemonListContainer: {
    maxHeight: "50%",
    marginHorizontal: 15,
  },

  // pokemon search bar

  pokemonSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1C242F",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 12,
    width: "100%",
  },
  pokedexSearchInput: {
    color: "white",
    fontSize: 16,
    opacity: 0.5,
    flex: 1,
  },
  botPokedexContainer: {
    flex: 1,
    backgroundColor: "#0F102C",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 320,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
  },
  pokemonBotText: {
    color: "white",
    fontSize: 16,
  },
});
