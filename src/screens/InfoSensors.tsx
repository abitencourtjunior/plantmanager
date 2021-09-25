import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { loadSensors } from "../libs/storage";
import { api } from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const InfoSensors = () => {
  const [count, setCount] = useState<Number>(0);

  const handleSubmitRequestNotification = async (token, name) => {
    const notification = {
      token_notification: await AsyncStorage.getItem(
        "@engefil:token_notification"
      ),
      token: token,
      nameReceiver: name,
    };

    console.log("Send Notification -> " + JSON.stringify(notification));

    const { data, status } = await api.post(
      "notification/v1/create/token/?key=" + "yIgkb4eAMHLBEOjtal6bQw==",
      notification
    );

    console.log(data);
    console.log(status);
    return;
  };

  useEffect(() => {
    async function fetchSensors() {
      const data = await loadSensors();
      data.forEach((element) => {
        handleSubmitRequestNotification(element.token, element.name);
      });
      setCount(data.length);
    }
    fetchSensors();

    const interval = setInterval(() => {
      fetchSensors();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

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
