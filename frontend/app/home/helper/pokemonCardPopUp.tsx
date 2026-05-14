import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

type alertType = {
  content: string;
  messageType: "error" | "success";
};

export default function AlertPopUp({
  cardData,
  showNewCard,
  onButtonClick,
}: {
  cardData: any;
  showNewCard: boolean;
  onButtonClick: () => void;
}) {
  return (
    <Modal
      visible={showNewCard}
      transparent
      animationType="fade"
      onRequestClose={onButtonClick}
    >
      <View style={styles.newCardContainer}>
        
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
