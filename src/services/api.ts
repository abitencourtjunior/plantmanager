import axios from "axios";

export const api = axios.create({
  baseURL: "https://authomus.herokuapp.com",
});
