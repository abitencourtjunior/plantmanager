import React from "react";
import { StyleSheet, Text } from "react-native";

import { RectButton, RectButtonProperties } from "react-native-gesture-handler";

import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

type PlantCardPrimaryProps = {
  plant: {
    name: string;
    photo: string;
  };
} & RectButtonProperties;

export const PlantCardPrimary = ({ plant, ...rest }: PlantCardPrimaryProps) => (
  <RectButton style={styles.container} {...rest}>
    <SvgFromUri uri={plant.photo} width={70} height={70} />
    <Text style={styles.text}>{plant.name}</Text>
  </RectButton>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    margin: 10,
  },

  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
});
