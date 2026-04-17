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
