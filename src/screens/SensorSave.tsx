import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { saveSensor } from "../libs/storage";

export const SensorSave = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [token, setToken] = useState<string>();

  function handleNameChange(value: string | undefined) {
    setName(value);
  }

  function handleNameProductChange(value: string | undefined) {
    setNameProduct(value);
  }

  function handleTokenChange(value: string | undefined) {
    setToken(value);
  }

  function clearForm() {
    setToken("");
    setNameProduct("");
    setName("");
  }

  async function handleSubmit() {
    if (!token || !name || !nameProduct) {
      return Alert.alert("Preencha todos os dados da placa!");
    }
    try {
      await saveSensor(token, name, nameProduct);
      clearForm();
      navigation.goBack();
    } catch (err) {
      Alert.alert("Não foi possível salvar o seu nome 😔");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.title}>Nova Placa</Text>
              </View>

              <TextInput
                style={[styles.input]}
                value={name}
                placeholder="Digite o nome do posto"
                onChangeText={handleNameChange}
              />

              <TextInput
                style={[styles.input]}
                value={nameProduct}
                placeholder="Digite o nome do Produto"
                onChangeText={handleNameProductChange}
              />

              <TextInput
                style={[styles.input]}
                value={token}
                placeholder="Digite o token da placa"
                onChangeText={handleTokenChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 1,
    width: "100%",
  },

  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 72,
  },

  header: {
    alignItems: "center",
  },

  emoji: {
    fontSize: 44,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },

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

  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
