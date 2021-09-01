import { SensorResponse } from "../types";

export const handleColorSensorOil = (sensor: SensorResponse | undefined) => {
  if (sensor?.level === null || sensor?.level === undefined) {
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

export const handleTextColorSensorOil = (
  sensor: SensorResponse | undefined
) => {
  if (sensor?.level === null || sensor?.level === undefined) {
    return;
  }

  switch (sensor?.level) {
    case 4:
      return { color: "black" };
    default:
      return { color: "white" };
  }
};

export const handleResponseMessageOil = (
  sensor: SensorResponse | undefined
) => {
  if (sensor?.level === null || sensor?.level === undefined) {
    return "[Óleo] Sensor não definido";
  }
  switch (sensor?.level) {
    case 4:
      return "Papeis filtrantes saturado em 80%, substituição em breve!";
    case 2:
      return "Papeis filtrantes 100% saturados, substituição imediata!";
    default:
      return "Pressão normal";
  }
};
