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
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const handleSubmitRequestSensor = async () => {
    const newSensor = {
      name: name,
      model: "ENGFILL_BOARD",
      token: token,
    };

    console.log("Sensor -> " + JSON.stringify(newSensor));

    const { data, status } = await api.post(
      "receiver/v1/create/token/?key=" + "yIgkb4eAMHLBEOjtal6bQw==",
      newSensor
    );

    console.log("Data -> " + data);
    console.log("Status Code -> " + status);
    return;
  };

  const handleSubmitRequestNotification = async () => {
    const notification = {
      token_notification: await AsyncStorage.getItem(
        "@engefil:token_notification"
      ),
      token: token,
    };

    console.log("Sensor -> " + JSON.stringify(notification));

    const { data, status } = await api.post(
      "notification/v1/create/token/?key=" + "yIgkb4eAMHLBEOjtal6bQw==",
      notification
    );

    console.log("Data -> " + data);
    console.log("Status Code -> " + status);
    return;
  };

  async function handleSubmit() {
    if (!token || !name || !nameProduct) {
      return Alert.alert("Preencha todos os dados da placa!");
    }
    try {
      handleSubmitRequestSensor();
      handleSubmitRequestNotification();
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
                placeholder="Digite o nome do Posto"
                onChangeText={handleNameChange}
                keyboardType="default"
              />

              <TextInput
                style={[styles.input]}
                value={nameProduct}
                placeholder="Digite o nome do Produto"
                onChangeText={handleNameProductChange}
                keyboardType="default"
              />

              <TextInput
                style={[styles.input]}
                value={token}
                placeholder="Digite o Token da Placa"
                onChangeText={handleTokenChange}
                keyboardType="numeric"
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
