const express = require('express');
const router = express.Router();

// Cache em memória
let cachedPokemons = null;
let cachedDate = null;

// Lista de lendários
const LEGENDARY_IDS = [
  144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251,
  377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
  480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493
];

router.get('/daily', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Se já temos cache para hoje, retorna
  if (cachedDate === today && cachedPokemons) {
    return res.json(cachedPokemons);
  }
  
  // Gerar 3 Pokémon do dia
  const dayOfWeek = new Date().getUTCDay();
  const pokemons = [];
  
  for (let i = 0; i < 3; i++) {
    let pokemonId;
    
    if (dayOfWeek === 0) {
      // Domingo: lendários
      const randomIndex = Math.floor(Math.random() * LEGENDARY_IDS.length);
      pokemonId = LEGENDARY_IDS[randomIndex];
    } else {
      // Dias de semana
      const ranges = {
        1: [1, 170], 2: [171, 341], 3: [342, 512],
        4: [513, 683], 5: [684, 854], 6: [855, 1025]
      };
      const [min, max] = ranges[dayOfWeek] || [1, 170];
      pokemonId = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // Buscar da PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await response.json();
    
    pokemons.push({
      id: data.id,
      name: data.name,
      types: data.types.map(t => t.type.name),
      height: data.height / 10,
      weight: data.weight / 10,
      ability: data.abilities[0]?.ability.name || 'Desconhecida',
      sprite: data.sprites.other['official-artwork']?.front_default || data.sprites.front_default
    });
  }
  
  // Salvar no cache
  cachedDate = today;
  cachedPokemons = pokemons;
  
  res.json(pokemons);
});

module.exports = router;