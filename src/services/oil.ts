import { SensorResponse } from "../types";

export const handleColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return null;
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
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

const handleSensorToValidate = (sensors: SensorResponse[]) => {
  return sensors.find((se) => se.type === 0);
};

export const handleTextColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
    return;
  }

  switch (sensor?.level) {
    case 4:
      return { color: "black" };
    default:
      return { color: "white" };
  }
};

export const handleResponseMessageOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return "[Óleo] Sensor não definido";
  }

  let sensor = handleSensorToValidate(sensors);

  if (sensor?.level === null) {
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
