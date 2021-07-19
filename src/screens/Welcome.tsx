import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";

import engefilImage from "../assets/engefil.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Welcome = () => {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Monitore {"\n"}
          seus filtros de {"\n"}
          forma fácil e prático
        </Text>

        <Image
          source={engefilImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}></Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    textAlign: "center",
    color: colors.heading,
    marginTop: 28,
    fontFamily: fonts.heading,
    lineHeight: 38,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },

  button: {
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 96,
  },

  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
