import axios from "axios";
import {API_URL} from "./constants";

const onSuccess = (response) => {
  return response;
};

const onError = (error) => {
  console.error(`[request error]: ${JSON.stringify(error)}`);
  return Promise.reject(error);
};

export const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 5_000,
  headers: {
    accept: "application/json",
  },
});

axiosClient.interceptors.response.use(onSuccess, onError);
