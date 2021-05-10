import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { PlantsSelection } from "../screens/PlantsSelection";
import { MyPlants } from "../screens/MyPlants";

import colors from "../styles/colors";

const AppTab = createBottomTabNavigator();

export const AuthRoutes = () => (
  <AppTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: "beside-icon",
      style: {
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
        height: 88,
      },
    }}
  >
    <AppTab.Screen
      name="Nova Planta"
      component={PlantsSelection}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />

    <AppTab.Screen
      name="Minhas Plants"
      component={MyPlants}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </AppTab.Navigator>
);
