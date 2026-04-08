import { submitSignUp } from "@/assets/services/authServices";
import { Picker } from "@react-native-picker/picker";
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

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [team, setTeam] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  function validateSignUp() {
    // Validate email format
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Validate password strength
    const isValidPassword = (password: string) => {
      return password.length >= 6;
    };

    // Check if passwords match
    const passwordsMatch = () => {
      return password === confPassword;
    };

    // Check if all fields are filled
    const allFieldsFilled = () => {
      return email && username && password && confPassword && team;
    };

    // Main validation function
    if (!allFieldsFilled()) {
      alert("Todos os campos são obrigatórios.");
      return false;
    }

    if (!isValidEmail(email)) {
      alert("Por favor, insira um email válido.");
      return false;
    }

    if (!isValidPassword(password)) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }

    if (!passwordsMatch()) {
      alert("As senhas não coincidem.");
      return false;
    }

    // Se chegou até aqui, tudo está válido

    return true;
  }

  async function handleSignUp() {
    if (!validateSignUp() || isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      await submitSignUp({
        email: email.trim(),
        password,
        username: username.trim(),
        team,
      });

      alert("Cadastro concluido. Sua conta foi criada com sucesso.");
      router.replace("/home");
    } catch (error: any) {
      const code = error?.code as string | undefined;
      const originalCode = error?.originalCode as string | undefined;

      console.error("signUp error", {
        code,
        originalCode,
        message: error?.message,
      });

      if (code === "auth/email-already-in-use") {
        alert("Email em uso. Este email ja esta cadastrado.");
      } else if (code === "auth/invalid-email") {
        alert("Email invalido. Informe um email valido.");
      } else if (code === "auth/weak-password") {
        alert("Senha fraca. A senha deve ter pelo menos 6 caracteres.");
      } else if (code === "profile/persist-failed") {
        if (originalCode === "permission-denied") {
          alert(
            "Conta criada, mas falhou ao salvar perfil. Verifique as regras do Firestore (permissao negada).\n\nCodigo: permission-denied",
          );
        } else {
          alert(
            `Conta criada, mas falhou ao salvar perfil no banco.\n\nCodigo: ${originalCode || "desconhecido"}`,
          );
        }
      } else {
        alert(
          `Falha no cadastro. Nao foi possivel criar a conta agora.\n\nCodigo: ${code || "desconhecido"}`,
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View>
      {/* backgrount Image */}
      <ImageBackground
        source={require("../../assets/images/Bg1.png")}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        {/* form  */}
        <View style={styles.signUpFormContainer}>
          <View style={styles.signUpFormContent}>
            {/* input section */}
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Email:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Nome de usuário:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setUsername}
                value={username}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Senha:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Confirme a senha:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setConfPassword}
                value={confPassword}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Time pokemon:</Text>
              <View style={styles.signUpPickerWrapper}>
                <Picker
                  style={styles.signUpPicker}
                  selectedValue={team}
                  onValueChange={(value, index) => setTeam(value as string)}
                >
                  <Picker.Item label="Selecione um time" value="" />
                  <Picker.Item label="Red - Valor" value="Red" />
                  <Picker.Item label="Yellow - Instinto" value="Yellow" />
                  <Picker.Item label="Blue - Místico" value="Blue" />
                </Picker>
              </View>
            </View>
            {/* signUp link */}
            <Link href={"/auth/login"} style={styles.gotoLoginLink}>
              Já tem uma conta? Conecte-se!
            </Link>
          </View>
          {/* buttons section */}
          <View style={styles.signUpButtonContainer}>
            <Pressable
              style={styles.signUpButton}
              onPress={handleSignUp}
              disabled={isSubmitting}
            >
              <Text style={styles.signUpButtonText}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Text>
            </Pressable>
            {/*
            <Pressable style={styles.signUpGoogleButton}>
              <Text style={styles.signUpButtonText}>Continuar com o Google</Text>
            </Pressable>
            */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  // backgrount Image
  backgroundImage: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  // form
  signUpFormContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 25,
    paddingVertical: 35,
    gap: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000000",
  },
  signUpFormContent: {
    width: "85%",
    alignItems: "center",
    gap: 15,
  },

  // input section
  signUpInputContainer: {
    width: "100%",
  },
  signUpInputLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpInput: {
    width: "100%",
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },
  signUpPickerWrapper: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000000",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  signUpPicker: {
    width: "100%",
  },

  // signUp link
  gotoLoginLink: {
    color: "blue",
    textDecorationLine: "underline",
  },

  // buttons section
  signUpButtonContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  signUpButton: {
    width: "85%",
    padding: 12,
    backgroundColor: "#ff9800",
    borderWidth: 0,
    borderRadius: 8,
  },
  signUpGoogleButton: {
    width: "85%",
    padding: 12,
    backgroundColor: "rgb(173, 216, 230)",
    borderWidth: 0,
    borderRadius: 8,
  },
  signUpButtonText: {
    width: "100%",
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
  },
});
