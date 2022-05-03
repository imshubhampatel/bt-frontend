import axios from "axios";
axios.defaults.withCredentials = true;
const API = "http://localhost:5001/api/v1";
// const API = "http://ec2-15-206-179-144.ap-south-1.compute.amazonaws.com/api/v1";
// API setup
const instances = axios.create({
  baseURL: API,
});

export default instances;
