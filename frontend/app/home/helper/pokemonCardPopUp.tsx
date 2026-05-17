import { Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type CardType = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  rarity: string;
  quantity: number;
};

export default function PokemonCardPopUp({
  cardData,
  visible,
  onClose,
}: {
  cardData: CardType | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!cardData) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.newCardContainer}>
        <View style={styles.popUpContent}>
          <Text style={styles.popUpTitle}>Sucesso!</Text>
          <Text style={styles.popUpMessage}>Você conseguiu um: {cardData.name}</Text>
          <Image source={cardData.image} style={{ width: 180, height: 240, alignSelf: "center" }} resizeMode="contain" />
          <Text style={styles.popUpMessage}>Raridade: {cardData.rarity}</Text>
          <Text style={styles.popUpMessage}>Quantidade no inventário: {cardData.quantity}</Text>
          <Pressable style={styles.popUpSuccessButton} onPress={onClose}>
            <Text style={styles.popUpButtonText}>Fechar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  newCardContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#00000067",
    position: "absolute",
    zIndex: 98,
    alignItems: "center",
    justifyContent: "center",
  },
  popUpContent: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    gap: 30,
    width: "70%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  popUpTitle: {
    fontSize: 22,
    fontWeight: "700",
  },
  popUpMessage: {
    fontSize: 15,
    fontWeight: "400",
  },
  popUpErrorButton: {
    backgroundColor: "#1d1d99",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems:"center",
    justifyContent: "center",
    alignSelf:"flex-end",
    padding: 5,
    height: 30,
    width: "55%",
  },
  popUpSuccessButton: {
    backgroundColor: "#067e06",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 10,
    alignItems:"center",
    justifyContent: "center",
    alignSelf:"flex-end",
    height: 35,
    width: "45%",
  },
  popUpButtonText: {
    fontWeight: "500",
    color: "#ffffff",
  }
});
