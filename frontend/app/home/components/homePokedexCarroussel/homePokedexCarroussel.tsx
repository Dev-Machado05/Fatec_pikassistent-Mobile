import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useRouter } from "expo-router";

const CARD_WIDTH = 132;
const CARD_GAP = 15;

type PokemonItem = {
  id: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string | null;
      };
    };
  };
};

type PokemonListResponse = {
  results: Array<{ url: string }>;
};

export default function PokedexCarroussel() {
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const translateX = useSharedValue(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchPokemon() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
        if (!res.ok) {
          throw new Error(`Falha na API: ${res.status}`);
        }

        const data: PokemonListResponse = await res.json();
        const details = await Promise.all(
          data.results.map(async (p) => {
            const res2 = await fetch(p.url);
            if (!res2.ok) {
              throw new Error(`Falha ao buscar detalhes: ${res2.status}`);
            }
            return (await res2.json()) as PokemonItem;
          }),
        );
        if (isMounted) {
          setPokemon(details);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Erro ao buscar o Pokemon:", error);
        if (isMounted) {
          setFetchError(
            "Ocorreu um erro ao buscar o pokemon, tente novamente mais tarde...",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchPokemon();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (pokemon.length === 0) return;

    const totalWidth = pokemon.length * (CARD_WIDTH + CARD_GAP);
    translateX.value = 0;

    translateX.value = withRepeat(
      withTiming(-totalWidth, {
        duration: 30000, // 30s
        easing: Easing.linear,
      }),
      -1,
      false,
    );

    return () => {
      cancelAnimation(translateX);
    };
  }, [pokemon, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const repeated = useMemo(() => [...pokemon, ...pokemon], [pokemon]);

  const renderContent = () => {
    if (fetchError) {
      return <Text style={styles.message}>{fetchError}</Text>;
    }

    if (isLoading) {
      return <Text style={styles.message}>Carregando imagens...</Text>;
    }

    if (repeated.length === 0) {
      return <Text style={styles.message}>Nenhum pokemon encontrado.</Text>;
    }

    return repeated.map((p, i) => {
      const imageUri = p.sprites.other["official-artwork"].front_default;
      return (
        <Pressable
          key={`${p.id}-${i}`}
          style={styles.card}
          onPress={() => {
            console.log(`id pokemon selecionado ${p.id}`);
            router.push("/Pokedex" as any);
          }}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <View style={[styles.image, styles.imageFallback]}>
              <Text style={styles.imageFallbackText}>?</Text>
            </View>
          )}
          <Text style={styles.name}>{p.name}</Text>
        </Pressable>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.carrousselContainer}>
        <Animated.View style={[styles.carrousselTrack, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(223, 243, 255, 0.7)",
  },
  carrousselContainer: {
    overflow: "hidden",
  },
  carrousselTrack: {
    flexDirection: "row",
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
  },
  image: {
    height: 100,
    width: 100,
  },
  imageFallback: {
    backgroundColor: "#eef4ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageFallbackText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4b6ba8",
  },
  name: {
    textTransform: "capitalize",
  },
  message: {
    fontSize: 14,
    color: "#1f2d3d",
    paddingHorizontal: 16,
  },
});
