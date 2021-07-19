import React, { useState, useEffect } from "react";
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { registerForPushNotificationsAsync } from "../notifications/notification";

export const UserIdentification = () => {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  const [identification, setIdentification] = useState<string>();

  useEffect(() => {
    async function loadUsername() {
      const user = await AsyncStorage.getItem("@engefil:user");
      const identification = await AsyncStorage.getItem(
        "@engefil:identification"
      );

      if (user || identification) {
        navigation.navigate("PlantsSelection");
      }
    }

    registerForPushNotificationsAsync();
    loadUsername();
  }, []);

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

  function handleInputIdentificationChange(value: string) {
    setIdentification(value);
  }

  async function handleSubmit() {
    if (!name) {
      return Alert.alert("Me diga como chamar você 😔");
    }

    try {
      await AsyncStorage.setItem("@engefil:user", name);
      await AsyncStorage.setItem(
        "@engefil:identification",
        identification as string
      );

      navigation.navigate("Confirmation", {
        title: "Obrigado",
        subtitle:
          "Agora vamos começar a cadastrar os sensores, para monitorarmos.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantsSelection",
      });
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
                <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>

                <Text style={styles.title}>
                  Como podemos {"\n"}
                  chamar você?
                </Text>
              </View>

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

              <TextInput
                style={[styles.input]}
                placeholder="Digite ID"
                onChangeText={handleInputIdentificationChange}
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
    paddingHorizontal: 54,
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
