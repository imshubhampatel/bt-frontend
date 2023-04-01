import axios from "axios";
import { refreshToken } from "./refreshToken";
const API = "http://localhost:5001/api/v1";
// first we create a undfiend cacelToken accroding to hitest api optimise code
export let cancelToken;

export const handleCancellation = () => {
  cancelToken.cancel("rejected previous request");
  cancelToken = undefined;
  // after cancellation making it again undfined so that last request can reached to server
};
const instance = axios.create({
  baseURL: API,
  headers: {
    withCredentials: true,
  },
});

instance.interceptors.request.use(function (config) {
  // canceltoken is updating here because we have to get every new token according to everynew request
  cancelToken = axios.CancelToken.source();
  config.cancelToken = cancelToken.token;
  console.log("config-->", config);
  return config;
});
instance.interceptors.response.use(
  function (response) {
    // canceltoken is updating here because we have to get every new token according to everynew request
    return response;
  },
  async function (error) {
    let rf_try = true;
    let oldRequest = error.config;

    let urlRefreshToken = "/super-admin/refresh-token";
    if (oldRequest.url === urlRefreshToken) {
      rf_try = false;
      localStorage.clear();
    }
    if (error.response.status === 401 && !oldRequest._retry && rf_try) {
      const { token } = await refreshToken();
      // console.log("accessToken", token);

      if (!token) {
        localStorage.clear();
        return;
      }
      instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      oldRequest.headers["Authorization"] = `Bearer ${token}`;
      return axios(oldRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
