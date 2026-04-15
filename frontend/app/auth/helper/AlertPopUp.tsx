import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

type alertType = {
  content: string;
  messageType: "error" | "success";
};

export default function AlertPopUp({
  alertData,
  showAlert,
  onButtonClick,
}: {
  alertData?: alertType;
  showAlert: boolean;
  onButtonClick: () => void;
}) {
  const route = useRouter();
  return (
    <Modal
      visible={showAlert}
      transparent
      animationType="fade"
      onRequestClose={onButtonClick}
    >
      <View style={styles.popUpContainer}>
        <View style={styles.popUpContent}>
          <Text style={styles.popUpTitle}>
            {alertData?.messageType === "error"
              ? "Erro..."
              : "Sucesso!"}
          </Text>
          <Text style={styles.popUpMessage}>{alertData?.content}</Text>
          {alertData?.messageType === "error" ? (
            <Pressable style={styles.popUpErrorButton} onPress={onButtonClick}>
              <Text style={styles.popUpButtonText}>Tentar novamente</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.popUpSuccessButton}
              onPress={() => route.replace("/home")}
            >
              <Text style={styles.popUpButtonText}>Continuar</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  popUpContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 98,
    alignItems: "center",
    justifyContent: "center",
  },
  popUpContent: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    gap: 20,
    width: "80%",
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
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    alignItems:"center",
    justifyContent: "center",
    alignSelf:"flex-end",
    padding: 5,
    height: 30,
    width: "55%",
  },
  popUpSuccessButton: {
    backgroundColor: "lightGreen",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    alignItems:"center",
    justifyContent: "center",
    alignSelf:"flex-end",
    padding: 5,
    height: 30,
    width: "55%",
  },
  popUpButtonText: {
    color: "#ffffff"
  }
});
