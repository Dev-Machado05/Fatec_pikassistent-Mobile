import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function signUp() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confPassword, setConfPassword] = useState<string>("");
  const [team, setTeam] = useState<string>("");

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

    console.log("a Validação foi um sucesso");
    // Se chegou até aqui, tudo está válido
    // chamar função de cadastro
    // handleSignUp(email, username, password, team, idNumber)

    return true;
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
          <Text style={styles.signUpFormTitle}>signUp</Text>
          <View style={styles.signUpFormContent}>
            {/* input section */}
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Email:</Text>
              <TextInput style={styles.signUpInput} onChangeText={setEmail} />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Nome de usuário:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Senha:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setPassword}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Confirme a senha:</Text>
              <TextInput
                style={styles.signUpInput}
                onChangeText={setConfPassword}
              />
            </View>
            <View style={styles.signUpInputContainer}>
              <Text style={styles.signUpInputLabel}>Time pokemon:</Text>
              <Picker
                style={[
                  styles.signUpInput,
                  {
                    borderWidth: 1,
                    borderColor: "#000000",
                    backgroundColor: "#ffffff",
                  },
                ]}
                selectedValue={team}
                onValueChange={(value, index) => setTeam(value as string)}
              >
                <Picker.Item label="Selecione um time" value="" />
                <Picker.Item label="Red" value="Red" />
                <Picker.Item label="Yellow" value="Yellow" />
                <Picker.Item label="Blue" value="Blue" />
              </Picker>
            </View>
            {/* signUp link */}
            <Link href={"./"} style={styles.gotoLoginLink}>
              Já tem uma conta? Conecte-se!
            </Link>
          </View>
          {/* buttons section */}
          <View style={styles.signUpButtonContainer}>
            <Pressable
              style={styles.signUpButton}
              onPress={async () => {
                // const ok = await validateSignUp
                // if (ok) { /*Go to home page*/}
                // else {alert("Falha ao fazer o signUp")}
              }}
            >
              <Text style={styles.signUpButtonText}>Cadastrar</Text>
            </Pressable>
            <Pressable
              style={styles.signUpGoogleButton}
              onPress={() => {
                // handleGooglesignUp;
              }}
            >
              <Text style={styles.signUpButtonText}>
                Continuar com o Google
              </Text>
            </Pressable>
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
    padding: 25,
    gap: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000000",
  },
  signUpFormTitle: {
    fontFamily: "Gill Sans",
    fontWeight: 700,
    fontSize: 28,
    color: "#000000",
    textAlign: "center",
  },
  signUpFormContent: { width: "85%", alignItems: "center", gap: 15 },

  // input section
  signUpInputContainer: { width: "100%" },
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

  // signUp link
  gotoLoginLink: { color: "blue", textDecorationLine: "underline" },

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
