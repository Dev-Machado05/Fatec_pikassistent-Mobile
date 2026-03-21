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

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Text style={styles.loginFormTitle}>Login</Text>
          <View style={styles.loginFormContent}>
            {/* input section */}
            <View style={styles.loginInputContainer}>
              <Text style={styles.loginInputLabel}>Email:</Text>
              <TextInput style={styles.loginInput} onChangeText={setEmail} />
            </View>
            <View style={styles.loginInputContainer}>
              <Text style={styles.loginInputLabel}>Senha:</Text>
              <TextInput style={styles.loginInput} onChangeText={setPassword} />
            </View>
            {/* login links */}
            <View>
              <Link href={"/auth/signUp"} style={styles.gotoSignUpLink}>
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
              onPress={async () => {
                // const ok = await handleLogin(email, password);
                // if (ok) { /*Go to home page*/}
                // else {alert("Falha ao fazer o login")}
              }}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </Pressable>
            <Pressable
              style={styles.loginGoogleButton}
              onPress={() => {
                // handleGoogleLogin;
              }}
            >
              <Text style={styles.loginButtonText}>Continuar com o Google</Text>
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
  loginFormContainer: {
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
  loginFormTitle: {
    fontFamily: "Gill Sans",
    fontWeight: 700,
    fontSize: 28,
    color: "#000000",
    textAlign: "center",
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
