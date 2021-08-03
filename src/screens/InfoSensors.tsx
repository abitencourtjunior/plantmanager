import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../components/Button";
import { loadSensors, saveSecondTimeToUpdate } from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const InfoSensors = () => {
  const [count, setCount] = useState<Number>(0);
  const [secondsToUpdate, setSecondsToUpdate] = useState<string>("15");

  async function fetchSensors() {
    const data = await loadSensors();
    setCount(data.length);
  }

  useEffect(() => {
    fetchSensors();
  }, []);

  const handleSecondsToUpdate = (value: string) => setSecondsToUpdate(value);

  const handleSubmit = () => {
    saveSecondTimeToUpdate(secondsToUpdate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View>
              <Text style={styles.title}>Informações</Text>
              <Text style={[styles.input]}>Quantidade de Placas: {count}</Text>
            </View>

            {/* <View style={styles.form}>
              <Text style={styles.title}>Tempo de Atualização</Text>
              <TextInput
                style={[styles.input]}
                placeholder="Informe o tempo em segundos"
                value={secondsToUpdate}
                onChangeText={handleSecondsToUpdate}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.button}>
              <Button title="Salvar Tempo" onPress={handleSubmit} />
            </View> */}
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
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    fontSize: 44,
  },

  button: {
    paddingTop: 10,
    width: "60%",
  },

  form: {
    paddingTop: 32,
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 10,
  },

  titleForm: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  input: {
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 24,
    padding: 10,
    textAlign: "center",
  },

  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
