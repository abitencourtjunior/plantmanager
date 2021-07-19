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
import AsyncStorage from "@react-native-async-storage/async-storage";

export const PlantCardPrimary = ({ plant, ...rest }: PlantCardPrimaryProps) => {
  const [sensors, setSensors] = useState<SensorResponse[]>([]);

  useEffect(() => {
    async function getData() {
      const { data } = await api.get("sensor/v1/token?key=" + plant.token);
      if (data !== undefined || data.length > 0) {
        setSensors(data);
      }
    }
    getData();

    const interval = setInterval(() => {
      getData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleColorSensorOil = (sensors: SensorResponse[]) => {
    if (sensors.length === 0) {
      return;
    }

    if (sensors[0].level === "1") {
      return { backgroundColor: "yellow" };
    }
  };

  const handleColorSensorWatter = (sensors: SensorResponse[]) => {
    if (sensors.length === 0) {
      return;
    }

    if (sensors[0].level === "1") {
      return { backgroundColor: "yellow" };
    }
  };

  const handleResponseMessageOil = (sensorsR: SensorResponse[]) => {
    if (sensorsR.length === 0) {
      return "[Óleo] Sensor não definido ou placa desconectada";
    }
    return sensorsR[0].level;
  };

  const handleResponseMessageWatter = (sensorsR: SensorResponse[]) => {
    if (sensorsR.length === 0) {
      return "[Água] Sensor não definido ou placa desconectada";
    }
    return sensorsR[1].level;
  };

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
        <View style={[styles.validation, handleColorSensorOil(sensors)]}>
          <Text style={styles.text}>{handleResponseMessageOil(sensors)}</Text>
        </View>
        <View style={[styles.validation, handleColorSensorWatter(sensors)]}>
          <Text style={styles.text}>
            {handleResponseMessageWatter(sensors)}
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
  },

  validation: {
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
});
