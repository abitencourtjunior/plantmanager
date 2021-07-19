import { SensorResponse } from "../types";

export const handleColorSensorWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  if (sensors[1].level === "1") {
    return { backgroundColor: "green" };
  }

  return { backgroundColor: "red" };
};

export const handleTextColorSensorWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  return { color: "white" };
};

export const handleResponseMessageWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return "[Água] Sensor não definido";
  }

  switch (sensors[1].level) {
    case "1":
      return "Diesel - OK - Sem contaminação";
    case "0":
      return "Diesel - Contaminado";
  }
};
