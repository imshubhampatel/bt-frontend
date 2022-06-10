import axios from "./Axios";
export const refreshToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let config = {
        method: "get",
        url: "/super-admin/refresh-token",
      };
      let { data } = await axios(config);
      console.log(data.data.token);
      if (data.data.token) {
        return resolve({ token: data.data.token });
      }
    } catch (error) {
      console.log(error.response.data.data);
      if (error) {
        return reject("error", error.response.data);
      }
    }
  });
};
