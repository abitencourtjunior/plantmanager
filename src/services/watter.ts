import { SensorResponse } from "../types";

export const handleColorSensorWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
    return;
  }

  if (sensor?.level === 0) {
    return { backgroundColor: "green", borderRadius: 25 };
  }

  return { backgroundColor: "red", borderRadius: 25 };
};

const handleSensorToValidate = (sensors: SensorResponse[]) => {
  return sensors.find((se) => se.type === 1);
};

export const handleTextColorSensorWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
    return;
  }

  return { color: "white" };
};

export const handleResponseMessageWatter = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return "[Água] Sensor não definido";
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
    return "[Água] Sensor não definido";
  }

  switch (sensor?.level) {
    case 0:
      return "Diesel - OK - Sem contaminação";
    case 1:
      return "Diesel - Contaminado";
  }
};
