import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function LandingPage() {
  const loggedIn = useState(false); // add function to fetch if someone is logged
  
  useEffect(() => {
    if (loggedIn) {
      // goto your home page
    } else {
      // keep in here
    }
  });

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <ImageBackground
          source={require("../assets/images/Bg1.png")}
          resizeMode="cover"
          style={styles.backgroundImage}
        >
          <View style={styles.heroSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>
                conheça o{" "}
                <Text style={styles.titleHighlight}>Pikassistent</Text>
              </Text>
              <Text style={styles.slogan}>
                Seu Assistente Pokémon Definitivo!
              </Text>
            </View>

            <Link href={"./"} asChild>
              <Pressable style={styles.ctaButton}>
                <Text style={styles.ctaButtonText}>
                  ⚡ Comece a montar a sua jornada aqui!
                </Text>
              </Pressable>
            </Link>

            <View style={styles.heroIntro}>
              <Text style={styles.introTitle}>O Que é o Pikassistent?</Text>
              <Text style={styles.introText}>
                Uma plataforma completa para treinadores Pokémon que une
                inteligência artificial, comunidade e ferramentas estratégicas.
                Nossa missão é ajudar você a se tornar um Mestre Pokémon com
                recursos inovadores e uma experiência única.
              </Text>
            </View>
          </View>

          {/* scroll hint */}
          <View style={styles.scrollHint}>
            <Text style={styles.scrollHintText}>Desça para explorar mais</Text>
            <Image source={require("../assets/images/downArrow.png")} />
          </View>
        </ImageBackground>
      </View>

      {/* Missions Section */}
      <View style={styles.infoContainer}>
        <View style={styles.missionContainer}>
          <View style={styles.missionContent}>
            <View style={styles.missionTitleContainer}>
              <Text style={styles.missionTitle}>🎯 Por Que?</Text>
            </View>
            <View style={styles.missionTextContainer}>
              <Text style={styles.missionText}>
                Percebemos que muitos treinadores enfrentam dificuldades para
                encontrar informações confiáveis, montar times competitivos e
                compartilhar experiências. O Pikassistent nasceu para solucionar
                esses problemas, criando um hub completo para a comunidade
                Pokémon brasileira.
              </Text>
            </View>
          </View>
          <View style={styles.missionContent}>
            <View style={styles.missionTitleContainer}>
              <Text style={styles.missionTitle}>🎯 Por Que?</Text>
            </View>
            <View style={styles.missionTextContainer}>
              <Text style={styles.missionText}>
                Percebemos que muitos treinadores enfrentam dificuldades para
                encontrar informações confiáveis, montar times competitivos e
                compartilhar experiências. O Pikassistent nasceu para solucionar
                esses problemas, criando um hub completo para a comunidade
                Pokémon brasileira.
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.featuresTitle}>O que ofertecemos:</Text>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresIntro}>
            Nós disponibilizamos tecnologias para auxiliar em sua jornada
            pokemon:
          </Text>

          <View style={styles.featureCard}>
            <View style={styles.featureCardHeader}>
              <Image
                source={require("../assets/images/pokedexIcon.png")}
                style={styles.featureCardHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureCardHeaderTitle}>
                Pokedex Inteligente
              </Text>
            </View>
            <View style={styles.featureCardContent}>
              <Text style={styles.featureContentDescription}>
                Acesse informações detalhadas de todos os Pokémon, incluindo
                estatísticas, evoluções, fraquezas e movimentos. Busque por
                tipo, geração ou habilidade.
              </Text>
            </View>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureCardHeader}>
              <Image
                source={require("../assets/images/premierball.png")}
                style={styles.featureCardHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureCardHeaderTitle}>Pikassistent IA</Text>
            </View>
            <View style={styles.featureCardContent}>
              <Text style={styles.featureContentDescription}>
                Nosso assistente de IA especializado em Pokémon responde
                dúvidas, sugere estratégias e ajuda a montar times vencedores
                baseado em análises avançadas.
              </Text>
            </View>
          </View>
          <View style={styles.featureCard}>
            <View style={styles.featureCardHeader}>
              <Image
                source={require("../assets/images/chatDefault.png")}
                style={styles.featureCardHeaderIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureCardHeaderTitle}>
                Comunidade Global
              </Text>
            </View>
            <View style={styles.featureCardContent}>
              <Text style={styles.featureContentDescription}>
                Conecte-se com treinadores de todo o mundo, compartilhe
                conquistas, participe de torneios e faça trocas seguras com
                outros jogadores.
              </Text>
            </View>
          </View>

          {/* botões autentificação */}
          <View style={styles.authContainer}>
            <Link href={"./"} asChild>
              <Pressable style={styles.signUpButton}>
                <Text style={styles.signUpButtonText}>Criar Conta Grátis</Text>
              </Pressable>
            </Link>
            <Link href={"./"} asChild>
              <Pressable style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Fazer Login</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerTagline}>
          <Text style={styles.footerTaglineHightlight}>Pikassistent</Text> - Seu
          companheiro na jornada pokémon
        </Text>
        <Text style={styles.footerAlert}>
          ⚠️ Este projeto foi desenvolvido para uma atividade acadêmica e não
          tem nenhum intuito monetário. Pokémon é uma marca registrada da
          Nintendo.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Hero Section
  heroContainer: {
    height: screenHeight,
    width: screenWidth,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  heroSection: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
    gap: 75,
  },
  titleContainer: {
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleHighlight: {
    color: "black",
  },
  slogan: {
    color: "black",
  },
  ctaButton: {
    marginTop: 35,
    backgroundColor: "#FD7932",
    maxWidth: "80%",
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 20,
    paddingEnd: 20,
    borderRadius: 15,
  },
  ctaButtonText: {
    color: "black",
    textAlign: "center",
    fontSize: 19,
    fontWeight: "700",
  },
  heroIntro: {
    alignItems: "center",
    gap: 15,
  },
  introTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  introText: {
    textAlign: "center",
    fontSize: 15,
  },

  // Scroll Hint
  scrollHint: {
    height: "auto",
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  scrollHintText: {
    color: "black",
  },

  // Missions / Info Section
  infoContainer: {
    width: screenWidth,
    backgroundColor: "#c9deff",
    alignItems: "center",
    paddingTop: 80,
    paddingRight: "7%",
    paddingBottom: 80,
    paddingLeft: "7%",
  },
  missionContainer: {
    flexDirection: "column",
    marginBottom: 64,
    gap: 40,
  },
  missionContent: {
    flexDirection: "column",
    width: "85%",
    borderRadius: 20,
    borderWidth: 5,
    borderColor: "white",
  },
  missionTitleContainer: {
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: "black",
    backgroundColor: "#fd7932",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  missionTextContainer: {
    padding: 12,
    backgroundColor: "#46b9bc",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  missionText: {
    fontSize: 15,
    lineHeight: 20,
  },

  // Features Section
  featuresTitle: {
    width: "100%",
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 20.33,
    lineHeight: 25,
    color: "#000000",
    marginBottom: 15,
  },
  featuresContainer: {
    flexDirection: "column",
    gap: 25,
  },
  featuresIntro: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
  },
  featureCard: {
    width: "auto",
    flexDirection: "column",
    borderWidth: 5,
    borderColor: "#ffffff",
    borderRadius: 25,
  },
  featureCardHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    padding: 15,
    backgroundColor: "#2c2a3e",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
  },
  featureCardHeaderIcon: {
    height: 70,
    width: 70,
  },
  featureCardHeaderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  featureCardContent: {
    backgroundColor: "#58a8c0",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
  },
  featureContentDescription: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
    lineHeight: 20,
  },

  // Authentication Buttons
  authContainer: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "orange",
    width: "45%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  signUpButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "orange",
    width: "45%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  loginButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "600",
  },

  // Footer
  footerContainer: {
    flexDirection: "column",
    gap: 20,
    padding: 20,
    backgroundColor: "#58a8c0",
    borderTopWidth: 2,
    borderTopColor: "#000000",
  },
  footerTagline: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
  footerTaglineHightlight: {
    color: "blue",
  },
  footerAlert: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
  },
});
