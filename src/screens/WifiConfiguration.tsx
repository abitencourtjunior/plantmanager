import React, { useState, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import colors from "../styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export const WifiConfiguration = () => {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const webviewRef = useRef(null);

  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

  const reloadButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.reload();
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <View style={styles.buttonAction}>
              <MaterialIcons
                name="arrow-left"
                size={36}
                color={colors.background}
              />
              <Text style={styles.button}>Voltar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={reloadButtonHandler}>
            <View style={styles.refreshAction}>
              <MaterialIcons
                name="refresh"
                size={28}
                color={colors.background}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={frontButtonHandler}>
            <View style={styles.buttonAction}>
              <Text style={styles.button}>Próximo</Text>
              <MaterialIcons
                name="arrow-right"
                size={36}
                color={colors.background}
              />
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: "http://192.168.4.1" }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainerLoading}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCanGoForward(navState.canGoForward);
            setCurrentUrl(navState.url);
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  buttonAction: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  refreshAction: {
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 4,
  },
  flexContainerLoading: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: colors.white,
    height: "100%",
    width: "100%",
  },
  tabBarContainer: {
    marginTop: Constants.statusBarHeight,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.orange,
  },
  button: {
    color: "white",
    fontSize: 18,
  },
});
