import { useEffect, useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type PokemonType = {
  type: {
    name: string;
    url: string;
  };
};

type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonAbility = {
  is_hidden: boolean;
  ability: {
    name: string;
  };
};

type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
};

type PokemonSpecies = {
  egg_groups: { name: string }[];
  evolution_chain: {
    url: string;
  } | null;
};

type EvolutionChainNode = {
  species: {
    name: string;
  };
  evolves_to: EvolutionChainNode[];
};

type EvolutionStage = {
  name: string;
  sprite: string;
};

export default function PokemonDetail() {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const pokemonId = useMemo(() => {
    const value = params.id;
    return Array.isArray(value) ? value[0] : value;
  }, [params.id]);

  const handleBackPress = () => {
    router.push("/Pokedex");
  };

  useEffect(() => {
    if (!pokemonId) {
      setError(true);
      setLoading(false);
      return;
    }

    async function fetchPokemonDetails() {
      try {
        setLoading(true);
        setError(false);

        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

        if (!pokemonResponse.ok) {
          throw new Error("Failed to load pokemon details");
        }

        const pokemonData = (await pokemonResponse.json()) as PokemonDetails;
        setPokemon(pokemonData);

        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);

        if (speciesResponse.ok) {
          const speciesData = (await speciesResponse.json()) as PokemonSpecies;
          setSpecies(speciesData);

          if (speciesData.evolution_chain?.url) {
            const evolutionResponse = await fetch(speciesData.evolution_chain.url);

            if (evolutionResponse.ok) {
              const evolutionData = (await evolutionResponse.json()) as { chain: EvolutionChainNode };

              const chainNames: string[] = [];
              const walkChain = (node: EvolutionChainNode) => {
                chainNames.push(node.species.name);
                node.evolves_to.forEach(walkChain);
              };

              walkChain(evolutionData.chain);

              const stageData = await Promise.all(
                chainNames.map(async (name) => {
                  const stageResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

                  if (!stageResponse.ok) {
                    return {
                      name,
                      sprite: "",
                    };
                  }

                  const stagePokemon = (await stageResponse.json()) as {
                    sprites?: {
                      other?: {
                        [key: string]: {
                          front_default?: string | null;
                          front_shiny?: string | null;
                        };
                      };
                      front_default?: string | null;
                    };
                  };

                  const sprite =
                    stagePokemon.sprites?.other?.["official-artwork"]?.front_default ||
                    stagePokemon.sprites?.other?.home?.front_default ||
                    stagePokemon.sprites?.front_default ||
                    "";

                  return { name, sprite };
                }),
              );

              setEvolutionChain(stageData);
            }
          }
        } else {
          setSpecies(null);
          setEvolutionChain([]);
        }
      } catch {
        setPokemon(null);
        setSpecies(null);
        setEvolutionChain([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonDetails();
  }, [pokemonId]);

  return (
    <ImageBackground source={require("../../../assets/images/Bg2.png")} style={styles.page}>
      {loading ? (
        <View style={styles.centerState}>
          <Text style={styles.statusText}>Carregando detalhes...</Text>
        </View>
      ) : error || !pokemon ? (
        <View style={styles.centerState}>
          <Text style={styles.statusText}>Erro ao carregar Pokémon.</Text>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <Pressable style={styles.backButton} onPress={handleBackPress}>
              <Text style={styles.backButtonText}>← Voltar</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>
              {pokemon.name} #{String(pokemon.id).padStart(3, "0")}
            </Text>

            <View style={styles.imageRow}>
              <View style={styles.imageBox}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`,
                  }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                />
                <Text style={styles.imageLabel}>Normal</Text>
              </View>

              <View style={styles.imageBox}>
                <Image
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`,
                  }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                />
                <Text style={styles.imageLabel}>Shiny</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tipos</Text>
              <View style={styles.typeContainer}>
                {pokemon.types.map((type) => {
                  const parts = type.type.url.split("/").filter(Boolean);
                  const typeId = parts[parts.length - 1] ?? type.type.name;

                  return (
                    <Image
                      key={type.type.name}
                      style={styles.typeBadge}
                      source={{
                        uri: `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/types/generation-ix/scarlet-violet/${typeId}.png`,
                      }}
                      resizeMode="contain"
                    />
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Físicas</Text>
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Altura</Text>
                  <Text style={styles.infoValue}>{pokemon.height / 10} m</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Peso</Text>
                  <Text style={styles.infoValue}>{pokemon.weight / 10} kg</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Base Stats</Text>
              <View style={styles.statsContainer}>
                {pokemon.stats.map((stat) => (
                  <View key={stat.stat.name} style={styles.statItem}>
                    <View style={styles.statHeader}>
                      <Text style={styles.statName}>{stat.stat.name.replace("-", " ")}</Text>
                      <Text style={styles.statValue}>{stat.base_stat}</Text>
                    </View>
                    <View style={styles.statBarTrack}>
                      <View
                        style={[
                          styles.statBarFill,
                          {
                            width: `${(stat.base_stat / 255) * 100}%`,
                            backgroundColor:
                              stat.base_stat > 100 ? "#4caf50" : stat.base_stat > 50 ? "#ee8329" : "#cd5241",
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Abilities</Text>
              <View style={styles.abilitiesContainer}>
                {pokemon.abilities.map((ability) => (
                  <View
                    key={ability.ability.name}
                    style={[styles.abilityChip, ability.is_hidden ? styles.hiddenAbility : styles.visibleAbility]}
                  >
                    <Text style={styles.abilityText}>
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden ? " (Hidden Ability)" : ""}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Egg Groups</Text>
              <View style={styles.tagContainer}>
                {species?.egg_groups?.length ? (
                  species.egg_groups.map((group) => (
                    <View key={group.name} style={styles.tagChip}>
                      <Text style={styles.tagText}>{group.name.replace("-", " ")}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Egg groups not available.</Text>
                )}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Evolution Chain</Text>
              <View style={styles.evolutionTrack}>
                {evolutionChain.length ? (
                  evolutionChain.map((name, index) => (
                    <View key={`${name.name}-${index}`} style={styles.evolutionStepWrap}>
                      <View style={styles.evolutionStepCard}>
                        <Text style={styles.evolutionStageLabel}>Stage {index + 1}</Text>
                        {name.sprite ? (
                          <Image source={{ uri: name.sprite }} style={styles.evolutionSprite} resizeMode="contain" />
                        ) : (
                          <View style={styles.evolutionSpriteFallback}>
                            <Text style={styles.evolutionSpriteFallbackText}>?</Text>
                          </View>
                        )}
                        <Text style={styles.evolutionStepName}>{name.name.replace("-", " ")}</Text>
                      </View>
                      {index < evolutionChain.length - 1 && <Text style={styles.evolutionArrow}>↓</Text>}
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Evolution chain not available.</Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#101629",
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headerRow: {
    marginBottom: 16,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f8752f",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1c242f",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    textTransform: "capitalize",
    marginBottom: 18,
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  imageBox: {
    flex: 1,
    backgroundColor: "#0f102c",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e7775e",
  },
  pokemonImage: {
    width: 120,
    height: 120,
  },
  imageLabel: {
    color: "#fff",
    marginTop: 8,
    fontSize: 12,
    opacity: 0.8,
  },
  section: {
    marginTop: 18,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  sectionTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  typeBadge: {
    width: 120,
    height: 42,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  infoItem: {
    flex: 1,
    backgroundColor: "#0f102c",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  infoLabel: {
    color: "#b6c2d1",
    fontSize: 12,
    marginBottom: 6,
  },
  infoValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  statsContainer: {
    gap: 12,
  },
  statItem: {
    gap: 6,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statName: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "600",
  },
  statValue: {
    color: "#fff",
    fontWeight: "800",
  },
  statBarTrack: {
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 999,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    borderRadius: 999,
  },
  abilitiesContainer: {
    gap: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  evolutionTrack: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  evolutionStepWrap: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  evolutionStepCard: {
    minWidth: 120,
    backgroundColor: "#0f102c",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
  },
  evolutionStageLabel: {
    color: "#b6c2d1",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  evolutionSprite: {
    width: 72,
    height: 72,
    marginBottom: 4,
  },
  evolutionSpriteFallback: {
    width: 72,
    height: 72,
    marginBottom: 4,
    borderRadius: 999,
    backgroundColor: "#262740",
    alignItems: "center",
    justifyContent: "center",
  },
  evolutionSpriteFallbackText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  evolutionStepName: {
    color: "#fff",
    fontWeight: "700",
    textTransform: "capitalize",
    textAlign: "center",
  },
  evolutionArrow: {
    color: "#ffd28a",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 22,
  },
  tagChip: {
    backgroundColor: "#0f102c",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  tagText: {
    color: "#fff",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  emptyText: {
    color: "#b6c2d1",
    textAlign: "center",
  },
  abilityChip: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  visibleAbility: {
    backgroundColor: "#29acbd",
  },
  hiddenAbility: {
    backgroundColor: "#ee7329",
  },
  abilityText: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "600",
  },
});