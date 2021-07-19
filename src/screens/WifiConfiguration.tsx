import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

export const WifiConfiguration = () => {
  return (
    <WebView style={styles.container} source={{ uri: "http://192.168.4.1" }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
