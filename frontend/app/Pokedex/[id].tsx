import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

export default function PokedexDetails() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text>Pokemon ID: {id}</Text> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})