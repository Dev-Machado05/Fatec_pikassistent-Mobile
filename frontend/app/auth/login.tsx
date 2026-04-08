import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { submitLogin } from "../../assets/services/authServices";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  function validateLogin() {
    // Main validation function
    // email validation function
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    
    // password validation Function
    const isValidPassword = (password: string) => {
      return password.length >= 6;
    };

    // Check if all fields are filled
    const allFieldsFilled = () => {
      return email && password;
    };


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

    // se chegar aqui deu tudo certo.
    return true
  }

  async function handleLogin() {
    if (!validateLogin() || isLoggingIn) {
      return;
    }

    try {
      setIsLoggingIn(true);

      await submitLogin({ email: email.trim(), password });
      router.replace("/home");
    } catch (error: any) {
      const code = error?.code as string | undefined;

      console.error("login error", {
        code,
        message: error?.message,
      });

      if (code === "auth/invalid-credential") {
        alert("Email ou senha invalidos.");
      } else if (code === "auth/user-not-found") {
        alert("Usuario nao encontrado.");
      } else if (code === "auth/wrong-password") {
        alert("Senha incorreta.");
      } else if (code === "auth/too-many-requests") {
        alert("Muitas tentativas. Tente novamente em alguns minutos.");
      } else {
        alert(`Falha no login.\n\nCodigo: ${code || "desconhecido"}`);
      }
    } finally {
      setIsLoggingIn(false);
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
        <View style={styles.loginFormContainer}>
          <View style={styles.loginFormContent}>
            {/* input section */}
            <View style={styles.loginInputContainer}>
              <Text style={styles.loginInputLabel}>Email:</Text>
              <TextInput
                style={styles.loginInput}
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.loginInputContainer}>
              <Text style={styles.loginInputLabel}>Senha:</Text>
              <TextInput
                style={styles.loginInput}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
            </View>
            {/* login links */}
            <View style={styles.linksContainer}>
              <Link href="./forgotPassword" style={styles.gotoSignUpLink}>
                Esqueceu a senha?
              </Link>
              <Link href={"/auth/signUp"} style={styles.gotoSignUpLink}>
                não tem uma conta? Cadastre-se!
              </Link>
            </View>
          </View>
          {/* buttons section */}
          <View style={styles.loginButtonContainer}>
            <Pressable
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoggingIn}
            >
              <Text style={styles.loginButtonText}>
                {isLoggingIn ? "Entrando..." : "Entrar"}
              </Text>
            </Pressable>
            {/*
            <Pressable style={styles.loginGoogleButton}>
              <Text style={styles.loginButtonText}>Continuar com o Google</Text>
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
  loginFormContainer: {
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
  loginFormContent: {
    width: "85%",
    alignItems: "center",
    gap: 15,
  },

  // input section
  loginInputContainer: {
    width: "100%",
  },
  loginInputLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  loginInput: {
    width: "100%",
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#000000",
  },

  // login links
  linksContainer: {
    gap: 10,
    paddingVertical: 5,
  },
  gotoSignUpLink: {
    color: "blue",
    textDecorationLine: "underline",
  },

  // buttons section
  loginButtonContainer: {
    height: "auto",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  loginButton: {
    width: "85%",
    padding: 12,
    backgroundColor: "#ff9800",
    borderWidth: 0,
    borderRadius: 8,
  },
  loginGoogleButton: {
    width: "85%",
    padding: 12,
    backgroundColor: "rgb(173, 216, 230)",
    borderWidth: 0,
    borderRadius: 8,
  },
  loginButtonText: {
    width: "100%",
    color: "#000000",
    fontWeight: "600",
    textAlign: "center",
  },
});
