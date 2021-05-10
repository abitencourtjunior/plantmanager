import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, FlatList, Alert } from "react-native";

import { formatDistance } from "date-fns/esm";
import { pt } from "date-fns/locale";

import { Header } from "../components/Header";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { Loading } from "../components/Loading";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import waterDrop from "../assets/waterdrop.png";

import { Plant } from "../types";

import { loadPlants, removePlant } from "../libs/storage";

export const MyPlants = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStoragedPlants() {
      const plantsStoraged = await loadPlants();

      const [firstPlant] = plantsStoraged;

      const nextTime = formatDistance(
        new Date(firstPlant.dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${firstPlant.name} à ${nextTime} horas`
      );

      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    loadStoragedPlants();
  }, []);

  function handleRemove(plant: Plant) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        style: "cancel",
      },
      {
        text: "Sim 😔",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldPlants) =>
              oldPlants.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert("Não foi possível remover! 😔");
          }
        },
      },
    ]);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(plant) => String(plant.id)}
          renderItem={({ item: plant }) => (
            <PlantCardSecondary
              plant={plant}
              handleRemove={() => handleRemove(plant)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },

  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  spotlightImage: {
    width: 60,
    height: 60,
  },

  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },

  plants: {
    flex: 1,
    width: "100%",
  },

  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
