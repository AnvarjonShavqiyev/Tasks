import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-nest-project.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;
