import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { SensorSave } from "../screens/SensorSave";
import { WifiConfiguration } from "../screens/WifiConfiguration";

import colors from "../styles/colors";
import { PlantsSelection } from "../screens/PlantsSelection";

const AppTab = createBottomTabNavigator();

export const AuthRoutes = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.orange,
      inactiveTintColor: colors.heading,
      labelPosition: "beside-icon",
      style: {
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
        height: 88,
      },
      labelStyle: {
        fontSize: 16,
      },
    }}
  >
    <AppTab.Screen
      name="Inicio"
      component={PlantsSelection}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="home" size={size} color={color} />
        ),
      }}
    />

    <AppTab.Screen
      name="Nova Placa"
      component={SensorSave}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />

    <AppTab.Screen
      name="Configurar"
      component={WifiConfiguration}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="wifi" size={size} color={color} />
        ),
      }}
    />
  </AppTab.Navigator>
);
