import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import {
  RectButton,
  RectButtonProperties,
  LongPressGestureHandler,
  State,
} from "react-native-gesture-handler";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { removeSensor } from "../libs/storage";

type PlantCardPrimaryProps = {
  plant: {
    name: string;
    name_product: string;
    token: string;
  };
} & RectButtonProperties;

import { api } from "../services/api";

import { SensorResponse } from "../types";
import {
  handleColorSensorOil,
  handleResponseMessageOil,
  handleTextColorSensorOil,
} from "../services/oil";

import {
  handleColorSensorWatter,
  handleResponseMessageWatter,
  handleTextColorSensorWatter,
} from "../services/watter";
export const PlantCardPrimary = ({ plant, ...rest }: PlantCardPrimaryProps) => {
  const [watter, setWatter] = useState<SensorResponse>();
  const [oil, setOil] = useState<SensorResponse>();

  useEffect(() => {
    const numberErrosDisconnection = 3;
    async function getDataOil() {
      let disconnect = [];
      const { data } = await api
        .get("sensor/v1/token?key=" + "OIL" + plant.token)
        .catch((e) => {
          console.log("Erro to get status: " + e + "Token: " + plant.token);
        });
      if (data !== "" || disconnect.length > numberErrosDisconnection) {
        setOil(data);
        disconnect = [];
      } else {
        disconnect.push(data);
      }
    }
    getDataOil();

    async function getDataWatter() {
      let disconnect = [];
      const { data } = await api
        .get("sensor/v1/token?key=" + "WAT" + plant.token)
        .catch((e) => {
          console.log("Erro to get status: " + e + "Token: " + plant.token);
        });
      if (data !== "" || disconnect.length > numberErrosDisconnection) {
        setWatter(data);
        disconnect = [];
      } else {
        disconnect.push(data);
      }
    }
    getDataWatter();

    const interval = setInterval(() => {
      getDataOil();
      getDataWatter();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteOnPress = (token: string) => {
    Alert.alert("Remover", `Deseja remover o sensor?`, [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: async () => {
          try {
            await removeSensor(token);
          } catch (error) {
            Alert.alert("Falha ao remover sensor!");
          }
        },
      },
    ]);
  };

  return (
    <LongPressGestureHandler
      onHandlerStateChange={({ nativeEvent }) => {
        if (nativeEvent.state === State.ACTIVE) {
          handleDeleteOnPress(plant.token);
        }
      }}
      minDurationMs={300}
    >
      <RectButton style={styles.container} {...rest}>
        <Text style={styles.text}>
          {plant.name} - {plant.name_product} - {plant.token}
        </Text>
        <View style={[styles.validation, handleColorSensorOil(oil)]}>
          <Text style={[styles.text, handleTextColorSensorOil(oil)]}>
            {handleResponseMessageOil(oil)}
          </Text>
        </View>
        <View style={[styles.validation, handleColorSensorWatter(watter)]}>
          <Text style={[styles.text, handleTextColorSensorWatter(watter)]}>
            {handleResponseMessageWatter(watter)}
          </Text>
        </View>
      </RectButton>
    </LongPressGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    margin: 10,
  },

  status: {
    flexDirection: "column",
    flex: 1,
  },

  text: {
    color: colors.orange,
    fontFamily: fonts.heading,
    marginVertical: 16,
    textAlign: "center",
    fontSize: 18,
  },

  validation: {
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 8,
    alignItems: "center",
    width: "90%",
  },
});
