import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { format } from "date-fns";

import { Plant, Sensor } from "../types";

export type StoragePlantProps = {
  [id: string]: {
    data: Plant;
    notificationId: string;
  };
};

export type StorageSensorProps = {
  [id: string]: {
    data: Sensor;
  };
};

export async function savePlant(plant: Plant): Promise<void> {
  try {
    const nextTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;

    if (repeat_every === "week") {
      const interval = Math.trunc(7 / times);
      nextTime.setDate(now.getDate() + interval);
    } else {
      nextTime.setDate(nextTime.getDate() + 1);
    }

    const seconds = Math.abs(
      Math.ceil((now.getTime() - nextTime.getTime()) / 1000)
    );

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Heey 🌱",
        body: `Está na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant,
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      },
    });

    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId,
      },
    };

    await AsyncStorage.setItem(
      "@plantmanager:plants",
      JSON.stringify({ ...newPlant, ...oldPlants })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function saveSensor(
  token: any,
  name: any,
  name_product: any
): Promise<void> {
  try {
    const data = await AsyncStorage.getItem("@engefil:sensors");
    const sensors = data ? (JSON.parse(data) as StorageSensorProps) : {};

    const newSensor = {
      [token as any]: {
        data: JSON.stringify({
          name: name,
          name_product: name_product,
          token: token,
        }),
      },
    };
    await AsyncStorage.setItem(
      "@engefil:sensors",
      JSON.stringify({ ...newSensor, ...sensors })
    );
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadPlants(): Promise<Plant[]> {
  try {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object.keys(plants)
      .map((plant) => ({
        ...plants[plant].data,
        hour: format(
          new Date(plants[plant].data.dateTimeNotification),
          "HH:mm"
        ),
      }))
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
            Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function loadSensors(): Promise<Sensor[]> {
  try {
    const data = await AsyncStorage.getItem("@engefil:sensors");
    const sensors = data ? (JSON.parse(data) as StorageSensorProps) : {};

    const plantsSorted = Object.keys(sensors).map((plant, index) => {
      const result = JSON.stringify(sensors[plant].data).split(",");
      let name = result[0].split(":")[1].replace("\\", "").replace('"', "");
      let name_product = result[1]
        .split(":")[1]
        .replace("\\", "")
        .replace('"', "");

      name = name.substring(0, name.length - 2);
      name_product = name_product.substring(0, name_product.length - 2);

      return {
        id: index as any,
        name: name,
        name_product: name_product,
        token: plant,
      };
    });

    return plantsSorted;
  } catch (error) {
    throw new Error(error);
  }
}

export async function removeSensor(token: string): Promise<void> {
  const data = await AsyncStorage.getItem("@engefil:sensors");
  const sensors = data ? (JSON.parse(data) as StorageSensorProps) : {};
  delete sensors[token];
  await AsyncStorage.setItem("@engefil:sensors", JSON.stringify(sensors));
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem("@plantmanager:plants");
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(
    plants[id].notificationId
  );

  delete plants[id];

  await AsyncStorage.setItem("@plantmanager:plants", JSON.stringify(plants));
}
