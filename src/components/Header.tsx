import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Header = () => {
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    async function loadUsername() {
      const user = await AsyncStorage.getItem("@plantmanager:user");

      setUsername(user || "");
    }

    loadUsername();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image
        source={{ uri: "https://github.com/abitencourtjunior.png" }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
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

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
