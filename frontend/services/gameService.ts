import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon';

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  ability: string;
  sprite: string;
}

// Lista de IDs lendários (principais - pode expandir depois)
const LEGENDARY_IDS = [
  144, 145, 146, 150, 151,  // Kanto
  243, 244, 245, 249, 250, 251,  // Johto
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,  // Hoenn
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,  // Sinnoh
  494, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,  // Unova
  716, 717, 718, 719, 720, 721,  // Kalos
  785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800,  // Alola
  888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,  // Galar
  1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017,  // Paldea
];

const API_BASE = 'http://localhost:7070/api'; // Ajuste para IP do seu backend

export async function getDailyPokemons(): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE}/daily`);
  const data = await response.json();
  return data;
}

function getRangeByDay(day: number): [number, number] {
  const ranges: Record<number, [number, number]> = {
    1: [1, 170],     // Segunda
    2: [171, 341],   // Terça
    3: [342, 512],   // Quarta
    4: [513, 683],   // Quinta
    5: [684, 854],   // Sexta
    6: [855, 1025]   // Sábado
  };
  return ranges[day] || [1, 170];
}

function getRandomIdFromRange([min, max]: [number, number], userId: string): number {
  // TODO: Implementar lógica de não repetição nos últimos 30 dias
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchPokemon(id: number): Promise<Pokemon> {
  try {
    const response = await fetch(`${POKEAPI_BASE}/${id}`);
    const data = await response.json();
    
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t: any) => t.type.name),
      height: data.height / 10,
      weight: data.weight / 10,
      ability: data.abilities[0]?.ability.name || 'Desconhecida',
      sprite: data.sprites.other['official-artwork']?.front_default || data.sprites.front_default
    };
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    throw error;
  }
}

// Função para salvar pontuação (integração com Firebase depois)
export async function saveScore(userId: string, points: number): Promise<void> {
  const currentScore = await AsyncStorage.getItem(`score_${userId}`);
  const newScore = (parseInt(currentScore || '0') + points).toString();
  await AsyncStorage.setItem(`score_${userId}`, newScore);
}

// Função para buscar ranking (mock - depois integra com backend)
export async function getRanking(): Promise<{ name: string; score: number }[]> {
  // TODO: Buscar do backend
  return [
    { name: "Ash", score: 12500 },
    { name: "Misty", score: 8900 },
    { name: "Brock", score: 6700 },
  ];
}