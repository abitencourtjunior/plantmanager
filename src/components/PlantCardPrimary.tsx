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
  const [sensors, setSensors] = useState<SensorResponse[]>([]);

  useEffect(() => {
    async function getData() {
      const { data } = await api
        .get("sensor/v1/token?key=" + plant.token)
        .catch((e) => {
          console.log(e);
        });
      console.log(data);
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
          <Text style={[styles.text, handleTextColorSensorOil(sensors)]}>
            {handleResponseMessageOil(sensors)}
          </Text>
        </View>
        <View style={[styles.validation, handleColorSensorWatter(sensors)]}>
          <Text style={[styles.text, handleTextColorSensorWatter(sensors)]}>
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
