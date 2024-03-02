import axios from "axios";

//axios.defaults.baseURL = "https://taskproapi-af20c66822dd.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

//For managing the access token
export const axiosReq = axios.create();
export const axiosRes = axios.create();