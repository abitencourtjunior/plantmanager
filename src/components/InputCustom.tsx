import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import colors from "../styles/colors";

export const InputCustom = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  function hanldeInpuBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setName(value);
    setIsFilled(!!value);
  }

  return (
    <TextInput
      style={[
        styles.input,
        (isFocused || isFilled) && { borderColor: colors.orange },
      ]}
      placeholder="Digite um nome"
      onBlur={hanldeInpuBlur}
      onFocus={handleInputFocus}
      onChangeText={handleInputChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
});
