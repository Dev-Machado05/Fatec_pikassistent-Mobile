import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Pokemon = {
  id: string;
  name: string;
  image: string;
};

export default function PokemonList({
  onSelect, 
  searchedText,
}: {
  onSelect: (pokemonId: string) => void;
  searchedText: string
}) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
  );
  const [loading, setLoading] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const loadPokemons = useCallback(async () => {
    if (!nextUrl || loading) return; // nada pra carregar ou já carregando

    setLoading(true);
    try {
      const res = await fetch(nextUrl);
      const data = await res.json();

      const formatted: Pokemon[] = data.results.map(
        (pokemon: { name: string; url: string }) => {
          const id = pokemon.url.split("/")[6];

          return {
            id,
            name: pokemon.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        },
      );

      setPokemons((prev) => [...prev, ...formatted]); // concatena
      setNextUrl(data.next); // a API da PokeAPI já retorna a próxima página
    } finally {
      setLoading(false);
    }
  }, [nextUrl, loading]);

  useEffect(() => {
    loadPokemons(); // carrega a primeira página
  }, [loadPokemons, ]);

  useEffect(() => {
    let cancelled = false;

    async function getSearchedPokemon() {
      try {
        const query = searchedText.trim().toLowerCase();

        if (!query) {
          if (!cancelled) setSearchedPokemon([]);
          return;
        }

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!res.ok) {
          if (!cancelled) setSearchedPokemon([]);
          return;
        }

        const pokemon = await res.json();
        const formatted: Pokemon = {
          id: String(pokemon.id),
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
        };

        if (!cancelled) setSearchedPokemon([formatted]);
      } catch {
        if (!cancelled) setSearchedPokemon([]);
      }
    }

    getSearchedPokemon();

    return () => {
      cancelled = true;
    };
  }, [searchedText]);

  return (
    <FlatList
      data={searchedText.trim() ? searchedPokemon : pokemons}
      keyExtractor={(item) => item.id}
      style={styles.pokemonListStyle}
      contentContainerStyle={styles.pokemonListContainer}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles.pokemonListContent,
            hoveredItemId === item.id && styles.pokemonListContentHover,
          ]}
          onPressIn={() => setHoveredItemId(item.id)}
          onPressOut={() => setHoveredItemId(null)}
          onPress={() => onSelect(item.id)}
        >
          <Image source={{ uri: item.image }} style={styles.pokemonImage} />
          <Text style={styles.pokemonId}>
            #
            {parseInt(item.id) <= 9
              ? `00${item.id}`
              : parseInt(item.id) <= 99
              ? `0${item.id}`
              : item.id}
          </Text>
          <Text style={styles.pokemonText}>{item.name}</Text>
        </Pressable>
      )}
      onEndReached={loadPokemons}
      onEndReachedThreshold={0.3} // quando chegar a ~30% do final
      ListFooterComponent={
        loading ? (
          <View style={{ padding: 10 }}>
            <ActivityIndicator color="#fff" />
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
  pokemonListStyle: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  pokemonListContainer: {
    backgroundColor: "#625E82",
    gap: 4,
  },
  pokemonListContent: {
    width: "100%",
    backgroundColor: "#0F102C",
    flexDirection: "row",
    padding: 5,
    gap: 10,
    alignItems: "center",
  },
  pokemonListContentHover: {
    backgroundColor: "#D7723B",
  },
  pokemonImage: {
    width: 50,
    height: 50,
  },
  pokemonId: {
    color: "white",
  },
  pokemonText: {
    color: "white",
  },
});
