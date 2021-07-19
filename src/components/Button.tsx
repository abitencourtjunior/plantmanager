import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = ({ title, ...rest }: ButtonProps) => (
  <TouchableOpacity style={styles.container} {...rest}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orange,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
