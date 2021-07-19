import { SensorResponse } from "../types";

export const handleColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  switch (sensor?.level) {
    case "4":
      return { backgroundColor: "yellow" };
    case "2":
      return { backgroundColor: "red" };
    default:
      return { backgroundColor: "green" };
  }
};

const handleSensorToValidate = (sensors: SensorResponse[]) => {
  return sensors.find((se) => se.type === "0");
};

export const handleTextColorSensorOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return;
  }

  let sensor = handleSensorToValidate(sensors);

  switch (sensor?.level) {
    case "4":
      return { color: "black" };
    case "2":
      return { color: "white" };
    default:
      return { color: "white" };
  }
};

export const handleResponseMessageOil = (sensors: SensorResponse[]) => {
  if (sensors.length === 0) {
    return "[Óleo] Sensor não definido";
  }

  let sensor = handleSensorToValidate(sensors);

  switch (sensor?.level) {
    case "4":
      return "Elemento Filtrante Saturado Em 80%, substituição em breve!";
    case "2":
      return "Pressão de Óleo Elevada, substituição imediata";
    default:
      return "Pressão normal";
  }
};
