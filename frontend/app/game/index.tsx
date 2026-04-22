import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDailyPokemons, Pokemon, saveScore } from '../../services/gameService';
import { router } from 'expo-router';

export default function GameScreen() {
  const [dailyPokemons, setDailyPokemons] = useState<Pokemon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);
  const [revealed, setRevealed] = useState(false);
  
  useEffect(() => {
    loadGame();
  }, []);
  
  const loadGame = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userToken') || 'guest';
      const pokemons = await getDailyPokemons();
      setDailyPokemons(pokemons);
      
      const savedScore = await AsyncStorage.getItem(`score_${userId}`);
      if (savedScore) setScore(parseInt(savedScore));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o jogo');
    }
    setLoading(false);
  };
  
  const currentPokemon = dailyPokemons[currentIndex];
  
  const getHint = () => {
    const hintsOrder = ['ability', 'height', 'type', 'number'];
    const hintType = hintsOrder[attempts - 1];
    
    switch(hintType) {
      case 'ability': return `⚡ Habilidade: ${currentPokemon?.ability}`;
      case 'height': return `📏 Altura: ${currentPokemon?.height}m | Peso: ${currentPokemon?.weight}kg`;
      case 'type': return `🔥 Tipo: ${currentPokemon?.types?.join('/')}`;
      case 'number': return `🔢 Nº ${currentPokemon?.id} na Pokédex`;
      default: return '';
    }
  };
  
  const calculatePoints = () => {
    const pointsTable = [100, 80, 60, 40, 20];
    return pointsTable[attempts] || 10;
  };
  
  const nextPokemon = () => {
    if (currentIndex + 1 < dailyPokemons.length) {
      setCurrentIndex(currentIndex + 1);
      setAttempts(0);
      setInput('');
      setRevealed(false);
    } else {
      setGameFinished(true);
    }
  };
  
  const checkGuess = () => {
    if (!input.trim()) {
      Alert.alert('Ops!', 'Digite o nome do Pokémon');
      return;
    }
    
    const isCorrect = input.toLowerCase().trim() === currentPokemon?.name;
    
    if (isCorrect) {
      const points = calculatePoints();
      const newScore = score + points;
      setScore(newScore);
      setRevealed(true);
      
      const userId = AsyncStorage.getItem('userToken');
      userId.then(id => {
        if (id) saveScore(id, points);
      });
      
      Alert.alert(
        '🎉 Acertou!', 
        `Você ganhou ${points} pontos!`,
        [{ text: 'Próximo Pokémon', onPress: nextPokemon }]
      );
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setRevealed(true);
        Alert.alert(
          '❌ Que pena!', 
          `Era ${currentPokemon?.name}!`,
          [{ text: 'Próximo Pokémon', onPress: nextPokemon }]
        );
      } else {
        Alert.alert('❌ Errou!', getHint());
      }
    }
    setInput('');
  };
  
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e7775e" />
      </View>
    );
  }
  
  if (gameFinished) {
    return (
      <View style={styles.center}>
        <Text style={styles.finishedTitle}>🎮 Dia concluído!</Text>
        <Text style={styles.finishedScore}>Pontuação total: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (!currentPokemon) return null;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Qual é esse Pokémon?</Text>
        <Text style={styles.score}>⭐ {score}</Text>
      </View>
      
      <Text style={styles.progress}>
        Pokémon {currentIndex + 1} de {dailyPokemons.length}
      </Text>
      
      <Image 
        source={{ uri: currentPokemon.sprite }}
        style={[styles.silhouette, revealed && styles.revealed]}
        resizeMode="contain"
      />
      
      {!revealed && attempts > 0 && (
        <View style={styles.hintsContainer}>
          <Text style={styles.hint}>{getHint()}</Text>
        </View>
      )}
      
      {!revealed && (
        <>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Digite o nome do Pokémon..."
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TouchableOpacity style={styles.button} onPress={checkGuess}>
            <Text style={styles.buttonText}>Adivinhar</Text>
          </TouchableOpacity>
          
          <Text style={styles.attempts}>
            Tentativas: {attempts}/5
          </Text>
        </>
      )}
      
      {revealed && (
        <View style={styles.revealedContainer}>
          <Text style={styles.revealedName}>{currentPokemon.name}</Text>
          <TouchableOpacity style={styles.button} onPress={nextPokemon}>
            <Text style={styles.buttonText}>Próximo →</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  backButton: {
    fontSize: 28,
    color: '#e7775e',
    paddingHorizontal: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  score: {
    fontSize: 18,
    color: '#e7775e',
    fontWeight: 'bold'
  },
  progress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30
  },
  silhouette: {
    width: 250,
    height: 250,
    tintColor: '#000',
    marginBottom: 30
  },
  revealed: {
    tintColor: undefined
  },
  hintsContainer: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%'
  },
  hint: {
    fontSize: 16,
    textAlign: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fafafa'
  },
  button: {
    backgroundColor: '#e7775e',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  attempts: {
    fontSize: 14,
    color: '#666'
  },
  finishedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  finishedScore: {
    fontSize: 20,
    marginBottom: 30
  },
  revealedContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  revealedName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 20
  }
});