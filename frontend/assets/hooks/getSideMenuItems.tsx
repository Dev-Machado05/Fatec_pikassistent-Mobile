import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function getSideMenuItems() {
  const sideMenuItems = [
    {
      name: "Home",
      Icon: require("../images/homeIcon.png"),
      link: "/home" 
    },
    {
        name: "chat Bot",
        Icon: require("../images/premierball.png"),
        link: "/chatBot" 
    },
    {
      name: "chat Global",
      Icon: require("../images/chatDefault.png"),
      link: "/chatGlobal" 
    },
    {
        name: "Pokedex",
        Icon: require("../images/pokedexIcon.png"),
        link: "/pokedex" 
    },
  ];

  return sideMenuItems;
}
