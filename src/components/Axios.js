import axios from "axios";

const baseUrl = ""https://shankuriakose.pythonanywhere.com/";
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  },
});

export default AxiosInstance;
