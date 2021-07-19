import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Header } from "../components/Header";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Sensor } from "../types";
import { loadSensors } from "../libs/storage";

export const PlantsSelection = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);

  async function fetchPlants() {
    const data = await loadSensors();
    setSensors(data);
  }

  useEffect(() => {
    fetchPlants();
  }, [sensors]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Monitore seus filtros em tempo real</Text>
      </View>

      <View style={styles.plants}>
        <FlatList
          data={sensors}
          keyExtractor={(sensor) => String(sensor.id)}
          renderItem={({ item: sensor }) => <PlantCardPrimary plant={sensor} />}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
    paddingTop: 40,
  },

  title: {
    fontSize: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
    paddingBottom: 20,
    textAlign: "center",
  },

  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    paddingBottom: 20,
  },

  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },

  plants: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
});
