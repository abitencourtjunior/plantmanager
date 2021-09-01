import axios from "axios";

export const api = axios.create({
  baseURL: "http://engefil-nordeste.herokuapp.com",
  //baseURL: "https://79c7-2804-2008-4047-7e87-282e-ac21-81c6-958a.ngrok.io",
});
