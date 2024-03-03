import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

//For managing the access token
export const axiosReq = axios.create();
export const axiosRes = axios.create();