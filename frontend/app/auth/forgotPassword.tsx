import { submitPasswordReset } from "../../assets/services/authServices";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      alert("Informe o email da sua conta.");
      return false;
    }

    if (!emailRegex.test(email.trim())) {
      alert("Por favor, insira um email válido.");
      return false;
    }

    return true;
  }

  async function handlePasswordReset() {
    if (!validateEmail() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await submitPasswordReset(email.trim());

      alert("Se o email existir, enviamos um link para redefinir sua senha.");
      router.replace("/auth/login");
    } catch (error: any) {
      const code = error?.code as string | undefined;

      console.error("password reset error", {
        code,
        message: error?.message,
      });

      if (code === "auth/invalid-email") {
        alert("Email inválido.");
      } else if (code === "auth/user-not-found") {
        alert("Nenhuma conta encontrada para esse email.");
      } else if (code === "auth/too-many-requests") {
        alert("Muitas tentativas. Tente novamente em alguns minutos.");
      } else {
        alert(`Falha ao enviar o reset.\n\nCodigo: ${code || "desconhecido"}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/Bg1.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.description}>
            Informe o email da conta para receber o link de redefinição.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.primaryButton}
              onPress={handlePasswordReset}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Enviando..." : "Enviar link de reset"}
              </Text>
            </Pressable>

            <Link href="/auth/login" style={styles.link}>
              Voltar para o login
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 30,
    gap: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000000",
  },
  description: {
    color: "#000000",
    textAlign: "center",
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  primaryButton: {
    width: "85%",
    padding: 12,
    backgroundColor: "#ff9800",
    borderRadius: 8,
  },
  buttonText: {
    width: "100%",
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});