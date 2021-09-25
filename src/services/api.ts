import axios from "axios";

export const api = axios.create({
  baseURL: "http://engefil-nordeste.herokuapp.com",
  // baseURL: "https://6c0a-2804-2008-404a-5b42-7195-f60d-93dd-d574.ngrok.io",
});
