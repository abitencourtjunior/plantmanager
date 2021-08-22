import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import engefilImage from "../assets/engefil.png";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const Header = () => {
  const [username, setUsername] = useState<string>();
  const [identification, setIdentification] = useState<string>();
  const navigation = useNavigation();

  const handleInfo = () => navigation.navigate("InfoSensors");

  useEffect(() => {
    async function loadUsername() {
      const user = await AsyncStorage.getItem("@engefil:user");
      const identification = await AsyncStorage.getItem(
        "@engefil:identification"
      );

      setUsername(user || "");
      setIdentification(identification || "");
    }

    loadUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.identification}>ID: {identification}</Text>
      </View>

      <TouchableOpacity onPress={handleInfo}>
        <Image source={engefilImage} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  username: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },

  identification: {
    fontSize: 18,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },

  image: {
    width: 150,
    height: 80,
    borderRadius: 35,
  },
});
