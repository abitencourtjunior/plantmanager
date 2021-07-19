import { SensorResponse } from "../types";

export const handleColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  switch (sensors[0].level) {
    case "4":
      return { backgroundColor: "yellow" };
    case "2":
      return { backgroundColor: "red" };
    default:
      return { backgroundColor: "green" };
  }
};

export const handleTextColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  switch (sensors[0].level) {
    case "4":
      return { color: "black" };
    case "2":
      return { color: "white" };
    default:
      return { color: "white" };
  }
};

export const handleResponseMessageOil = (sensorsR: SensorResponse[]) => {
  if (sensorsR.length === 0) {
    return "[Óleo] Sensor não definido";
  }

  switch (sensorsR[0].level) {
    case "4":
      return "Elemento Filtrante Saturado Em 80%, substituição em breve!";
    case "2":
      return "Pressão de Óleo Elevada, substituição imediata";
    default:
      return "Pressão normal";
  }
};
