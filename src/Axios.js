import axios from "axios";
import { refreshToken } from "./refreshToken";
axios.defaults.withCredentials = true;
const API = "http://localhost:5001/api/v1";
// first we create a undfiend cacelToken accroding to hitest api optimise code
export let cancelToken;

export const handleCancellation = () => {
  cancelToken.cancel("rejected previous request");
  cancelToken = undefined;
  // after cancellation making it again undfined so that last request can reached to server
};
const axiosInstance = axios.create({
  baseURL: API,
});
axiosInstance.interceptors.request.use(function (config) {
  // canceltoken is updating here because we have to get every new token according to everynew request
  cancelToken = axios.CancelToken.source();
  config.cancelToken = cancelToken.token;
  console.log("config-->", config);
  return config;
});
axiosInstance.interceptors.response.use(
  function (response) {
    // canceltoken is updating here because we have to get every new token according to everynew request
    return response;
  },
  async function (error) {
    console.log(error.response);
    const oldRequest = error.config;
    console.log("orignalrequest", oldRequest);
    if (error.response.status === 401 && !oldRequest._retry) {
      oldRequest._retry = true;
      const { token } = await refreshToken();
      if (!token) {
        localStorage.clear();
        return;
      }
      console.log("accessToken", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      oldRequest.headers["Authorization"] = `Bearer ${token}`;
      return axios(oldRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
