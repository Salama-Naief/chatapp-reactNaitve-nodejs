import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://10.0.2.2:5000/api",
  withCredentials: true,
});
