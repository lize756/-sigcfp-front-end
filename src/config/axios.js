import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8484/",
  responseType: "json",
  headers: { "X-Requested-Width": "XMLHttpRequest" },
});

export default instance;
