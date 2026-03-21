import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, View, Image } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<any>(null);
  const pokemonId = 1; // Example: Bulbasaur

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pokedex</Text>
      <View style={styles.topPokedexContainer}>
        <View style={styles.pokemonInfo}>
          <View style={styles.pokemonInfoRow}>
            <Text style={styles.pokemonTopText}>#{pokemon?.id ?? "-"}</Text>
            <Text style={styles.pokemonTopText}>{pokemon?.name ?? "Loading..."}</Text>
          </View>  
          {pokemon?.sprites?.front_default && (
            <View style={styles.pokemonImageContainer}>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.pokemonImage}
                resizeMode="contain"
              />
            </View>
          )}
        <Text style={styles.pokedexTopText}>Clique aqui para ver mais</Text>
        </View>
      </View>

      <View style={styles.pokemonSearchContainer}>
        <FontAwesome name="search" size={20} color="#e7775e" />
        <TextInput
          style={styles.pokedexSearchInput}
          placeholder="Procurar..."
          placeholderTextColor="#e7775e"
        />
      </View>

      <View style={styles.botPokedexContainer}>
        <Link style={styles.pokemonBotText} href="/Pokedex/1">Go to Pokemon 1</Link>
        <Link style={styles.pokemonBotText} href="/Pokedex/2">Go to Pokemon 2</Link>
        <Link style={styles.pokemonBotText} href="/Pokedex/3">Go to Pokemon 3</Link>
      </View>
    </View>
    // TODO:
    // Puxar IDs do pokeapi.co e gerar links dinamicamente
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  topPokedexContainer: {
    flex: 1,
    backgroundColor: "#1C242F",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 320,
    borderRadius: 16,
    padding: 16,
  },
  pokemonInfo: {
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0F102C",
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
    marginBottom: 8,
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
  pokemonSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#1C242F",
    borderRadius: 12,
    padding: 12,
    width: 320,
    
  },
  pokedexSearchInput: {
    color: "white",
    fontSize: 16,
    opacity: 0.5,
  },
  botPokedexContainer: {
    flex: 1,
    backgroundColor: "#0F102C",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: 320,
    borderRadius: 16,
    padding: 16,
  },
  pokemonBotText: {
    color: "white",
    fontSize: 16,
  },
});
