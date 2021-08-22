import { SensorResponse } from "../types";

export const handleColorSensorOil = (sensor: SensorResponse) => {
  if (sensor?.level === null || sensor === undefined) {
    return;
  }

  switch (sensor?.level) {
    case 4:
      return { backgroundColor: "yellow", borderRadius: 25 };
    case 2:
      return { backgroundColor: "red", borderRadius: 25 };
    default:
      return { backgroundColor: "green", borderRadius: 25 };
  }
};

export const handleTextColorSensorOil = (sensor: SensorResponse) => {
  if (sensor?.level === null || sensor === undefined) {
    return;
  }

  switch (sensor?.level) {
    case 4:
      return { color: "black" };
    default:
      return { color: "white" };
  }
};

export const handleResponseMessageOil = (sensor: SensorResponse) => {
  if (sensor?.level === null || sensor === undefined) {
    return "[Óleo] Sensor não definido";
  }

  switch (sensor?.level) {
    case 4:
      return "Elemento Filtrante Saturado Em 80%, substituição em breve!";
    case 2:
      return "Pressão de Óleo Elevada, substituição imediata";
    default:
      return "Pressão normal";
  }
};
