import axios from "axios";

const API = "http://localhost:5000/api/v1";
// API setup
const instances = axios.create({
  baseURL: API,
});

export default instances;
