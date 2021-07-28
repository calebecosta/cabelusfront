import axios from 'axios';
import { servicePath } from "../constants/defaultValues";

const api = axios.create({
  baseURL: servicePath,
  timeout: 120000,
});

const token = localStorage.getItem("@cabelus/token") || "";

if (token !== "") {
  api.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
  };
}

export default api;
