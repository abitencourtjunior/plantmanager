import { SensorResponse } from "../types";

export const handleColorSensorWatter = (sensor: SensorResponse | undefined) => {
  if (sensor?.level === null || sensor?.level === undefined) {
    return;
  }

  if (sensor?.level === 1) {
    return { backgroundColor: "green", borderRadius: 25 };
  }

  return { backgroundColor: "red", borderRadius: 25 };
};

export const handleTextColorSensorWatter = (
  sensor: SensorResponse | undefined
) => {
  if (sensor?.level === null || sensor?.level === undefined) {
    return;
  }

  return { color: "white" };
};

export const handleResponseMessageWatter = (
  sensor: SensorResponse | undefined
) => {
  if (sensor?.level === null || sensor?.level === undefined) {
    return "[Água] Sensor não definido";
  }

  switch (sensor?.level) {
    case 1:
      return "Diesel - OK - Sem contaminação";
    case 0:
      return "Diesel - Contaminado";
  }
};
