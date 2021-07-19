import { SensorResponse } from "../types";

export const handleColorSensorWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === "1") {
    return { backgroundColor: "green" };
  }

  return { backgroundColor: "red" };
};

const handleSensorToValidate = (sensors: SensorResponse[]) => {
  return sensors.find((se) => se.type === "1");
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

  let sensor = handleSensorToValidate(sensors);

  switch (sensor?.level) {
    case "1":
      return "Diesel - OK - Sem contaminação";
    case "0":
      return "Diesel - Contaminado";
  }
};
