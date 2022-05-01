// import React, {Component} from 'react';
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { showCustomAlert } from "../../redux/alert/alert.action";
import {
  redirectUnauthUser,
  setRedirectFalse,
} from "../../redux/redirect/redirect.action";
import store from "../../redux/store";
const moment = require("moment");
const axiosinstance = axios.create();
// const BASE_URL = "http://localhost:3030/api/";
// const BASE_URL = "http://139.59.67.166:3030/api/";
const BASE_URL = "https://katlego.in:3020/api/";

// const get_session_token = () => {
//   return localStorage.getItem("accessToken");
// };

// // Function that will be called to refresh authorization
// const refreshAuthLogic = failedRequest =>hitServerApi('regenerateToken',{refreshToken:localStorage.getItem("refreshToken")}).then(async res => {

//   if (res.status) {

//     axiosinstance.defaults.headers.common['authorization'] = res.data.token;
//     await set_session(res);
//   return Promise.resolve();

//   }else{
//     // store.dispatch(redirectUnauthUser())
//     // store.dispatch(setRedirectFalse())
//     localStorage.clear();
//   return Promise.reject();

//   }
// });

// createAuthRefreshInterceptor(axiosinstance, refreshAuthLogic);

//request interceptor to add the auth token header to requests
axiosinstance.interceptors.request.use(
  async (config) => {
    const location_id = store.getState((state) => state);

    config.headers["location_id"] = location_id.user.location.address_id;
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const token_expiry = localStorage.getItem("token_expiry");
    // if (accessToken && token_expiry) {
    //   if(moment().isBefore(moment(token_expiry))){
    //     config.headers["authorization"] = accessToken;
    //   }else{
    //     // await hitServerApi('regenerateToken',{refreshToken:refreshToken}).then(async (res) => {
    //     //   if (res.status) {
    //     //     axiosinstance.defaults.headers.common['authorization'] = res.data.token;
    //     //     await set_session(res);
    //     //     console.log("Access token refreshed!in");
    //     //   }else{
    //     //     logout_user();

    //     //   }
    //     // });
    //   }
    // }else{

    // }

    if (accessToken) {
      config.headers["authorization"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
//response interceptor to refresh token on receiving token expired error
axiosinstance.interceptors.response.use(
  (response) => {
    // console.log('response',response);
    if (response.data.message === "Unauthorized") {
      store.dispatch(redirectUnauthUser());
      store.dispatch(setRedirectFalse());
    }

    return response;
  },
  async function (error) {
    // debugger;
    const originalRequest = error.config;
    // console.log('originalRequest',originalRequest);

    let refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && error.response.status === 401) {
      originalRequest._retry = true;
      await hitServerApi("regenerateToken", {
        refreshToken: refreshToken,
      }).then(async (res) => {
        if (res.status) {
          axiosinstance.defaults.headers.common["authorization"] =
            res.data.token;
          // localStorage.setItem("accessToken", res.data.token);
          await set_session(res);
          // console.log("Access token refreshed!");
          await axiosinstance(originalRequest);
        } else {
          localStorage.clear();
          store.dispatch(redirectUnauthUser());
          store.dispatch(setRedirectFalse());
        }
      });
    } else {
      // console.log('sdfnfvnfnjfn');
    }
    return Promise.reject(error);
  }
);

export const hitServerApi = async (urlMethod, data = {}, method = "post") => {
  const LOGIN_ENDPOINT = `${BASE_URL}${urlMethod}`;
  return new Promise(async (resolve, reject) => {
    await axiosinstance({
      method: method,
      url: LOGIN_ENDPOINT,
      // headers: {
      //   Authorization: get_session_token(),
      // },
      data: data,
    })
      .then((response) => resolve(response.data))
      .catch((e) => {
        const errorobj = {
          status: false,
          message: e.message,
        };
        reject(errorobj);
      });
  });
};

const encrpt_decrypt_salt = "salt";

export const encrypt_string = (text) => {
  const salt = encrpt_decrypt_salt;

  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt_strring = (encoded) => {
  const salt = encrpt_decrypt_salt;

  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

export const set_session = async (response) => {
  localStorage.setItem("accessToken", response.token);
  localStorage.setItem("data", response.data);
  localStorage.setItem("refreshToken", response.refreshtoken);
  localStorage.setItem("token_expiry", response.token_expiry);
};

export const logout_user = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("data");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token_expiry");
  localStorage.clear();
};

export const get_session = async (response) => {
  const token = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  var data;
  var userdataget;
  if (token) {
    userdataget = await user_profile()
      .then((user) => {
        if (user.status) {
          data = user.data;
        }
        return user;
      })
      .catch((er) => null);
  }
  const token_expiry = await localStorage.getItem("token_expiry");

  const obj = {
    status: token && userdataget ? true : false,
    token: token,
    token_expiry: token_expiry,
    data: data,
    refreshToken: refreshToken,
  };

  // console.log("====================================");
  // console.log("dhfff", obj);
  // console.log("====================================");
  return obj;
};

export const user_signup_otp = async (data) => {
  const serverdata = await hitServerApi("user_signup_otp", data);
  return serverdata;
};
export const resend_otp = async (data) => {
  const serverdata = await hitServerApi("resend_otp", data);
  return serverdata;
};

export const user_signup_verify = async (data) => {
  const serverdata = await hitServerApi("user_signup_verify", data);
  return serverdata;
};

export const user_login = async (data) => {
  const serverdata = await hitServerApi("user_login", data);
  return serverdata;
};

export const forgot_otp = async (data) => {
  const serverdata = await hitServerApi("forgot_otp", data);
  return serverdata;
};

export const forgot_verify_otp = async (data) => {
  const serverdata = await hitServerApi("forgot_verify_otp", data);
  return serverdata;
};

export const forgot_change_password = async (data) => {
  const serverdata = await hitServerApi("forgot_change_password", data);
  return serverdata;
};

export const fetch_homepage_web = async (data) => {
  const serverdata = await hitServerApi("fetch_homepage_web", data);
  return serverdata;
};

export const fetch_faqs = async (data) => {
  const serverdata = await hitServerApi("fetch_faqs", data);
  return serverdata;
};

export const fetch_popular_searches = async (data) => {
  const serverdata = await hitServerApi("fetch_popular_searches", data);
  return serverdata;
};

export const fetch_homepage_web_auth = async (data) => {
  const serverdata = await hitServerApi("fetch_homepage_web_auth", data);
  return serverdata;
};

export const fetch_location_by_id = async (data) => {
  const serverdata = await hitServerApi("fetch_location_by_id", data);
  return serverdata;
};

export const fetch_locations = async (data) => {
  const serverdata = await hitServerApi("fetch_locations", data);
  return serverdata;
};

export const check_if_service_location = async (data) => {
  const serverdata = await hitServerApi("check_if_service_location", data);
  return serverdata;
};

export const fetch_product_details = async (data) => {
  const serverdata = await hitServerApi("fetch_product_details", data);
  return serverdata;
};

export const get_testimonials = async (data) => {
  const serverdata = await hitServerApi("get_testimonials", data);
  return serverdata;
};

export const fetch_products_by_category = async (data) => {
  const serverdata = await hitServerApi("fetch_products_by_category", data);
  return serverdata;
};

export const user_profile = async (data = {}) => {
  const serverdata = await hitServerApi("user_profile", data);
  // console.log("serverdata", serverdata);
  return serverdata;
};

export const add_cart = async (data = {}) => {
  const serverdata = await hitServerApi("add_cart", data);
  // console.log('add crt',serverdata);
  return serverdata;
};

export const remove_cart_item = async (data = {}) => {
  const serverdata = await hitServerApi("remove_cart_item", data);
  return serverdata;
};

export const get_cart_items = async (data = {}) => {
  const serverdata = await hitServerApi("get_cart_items", data);
  return serverdata;
};

export const fetch_areas = async (data = {}) => {
  const serverdata = await hitServerApi("fetch_areas", data);
  return serverdata;
};

export const fetch_showcase_category = async (data = {}) => {
  const serverdata = await hitServerApi("fetch_showcase_category", data);
  return serverdata;
};

export const fetch_showcase_products = async (data = {}) => {
  const serverdata = await hitServerApi("fetch_showcase_products", data);
  return serverdata;
};

export const edit_user_profile = async (data = {}) => {
  const serverdata = await hitServerApi("edit_user_profile", data);
  return serverdata;
};

export const get_settings = async (data = {}) => {
  const serverdata = await hitServerApi("get_settings", data);
  return serverdata;
};

export const add_to_wishlist = async (data = {}) => {
  const serverdata = await hitServerApi("add_to_wishlist", data);
  return serverdata;
};
export const fetch_wishlists = async (data = {}) => {
  const serverdata = await hitServerApi("fetch_wishlists", data);
  return serverdata;
};

export const get_blogs = async (data = {}) => {
  const serverdata = await hitServerApi("get_blogs", data);
  return serverdata;
};

export const change_password_by_old_password = async (data = {}) => {
  const serverdata = await hitServerApi(
    "change_password_by_old_password",
    data
  );
  return serverdata;
};

export const order_details = async (data = {}) => {
  const serverdata = await hitServerApi("order_details", data);
  return serverdata;
};

export const add_address = async (data = {}) => {
  const serverdata = await hitServerApi("add_address", data);
  return serverdata;
};

export const fetch_addresses = async (data = {}) => {
  const serverdata = await hitServerApi("fetch_addresses", data);
  return serverdata;
};

export const delete_address = async (data = {}) => {
  const serverdata = await hitServerApi("delete_address", data);
  return serverdata;
};

export const you_may_like = async (data) => {
  const serverdata = await hitServerApi("you_may_like", data);
  return serverdata;
};

export const deliveryconfig = async (data) => {
  const serverdata = await hitServerApi("deliveryconfig", data);
  return serverdata;
};

export const generate_order = async (data) => {
  const serverdata = await hitServerApi("generate_order", data);
  return serverdata;
};

export const fetch_navbar_category_product = async (data) => {
  const serverdata = await hitServerApi("fetch_navbar_category_product", data);
  return serverdata;
};

export const search_product = async (data) => {
  const serverdata = await hitServerApi("search_product", data);
  return serverdata;
};

export const get_products_by_filters = async (data) => {
  const serverdata = await hitServerApi("get_products_by_filters", data);
  return serverdata;
};

export const wallet_plans = async (data) => {
  const serverdata = await hitServerApi("wallet_plans", data);
  return serverdata;
};

export const generate_order_req = async (data) => {
  const serverdata = await hitServerApi("generate_order_req", data);
  return serverdata;
};

export const recharge_user_wallet_web = async (data) => {
  const serverdata = await hitServerApi("recharge_user_wallet_web", data);
  return serverdata;
};

export const wallet_history_api = async (data) => {
  const serverdata = await hitServerApi("wallet_history", data);
  return serverdata;
};

export const add_support_data = async (data) => {
  const serverdata = await hitServerApi("add_support_data", data);
  return serverdata;
};

export const add_collaborate_data = async (data) => {
  const serverdata = await hitServerApi("add_collaborate_data", data);
  return serverdata;
};

export const add_career_data = async (data) => {
  const serverdata = await hitServerApi("add_career_data", data);
  return serverdata;
};

export const fetch_navbar_categories = async (data) => {
  const serverdata = await hitServerApi("fetch_navbar_categories", data);
  return serverdata;
};

export const get_recipes = async (data) => {
  const serverdata = await hitServerApi("get_recipes", data);
  return serverdata;
};

export const my_order_history = async (data) => {
  const serverdata = await hitServerApi("my_order_history", data);
  return serverdata;
};

export const fetch_press_release = async (data) => {
  const serverdata = await hitServerApi("fetch_press_release", data);
  return serverdata;
};

export const fetch_partners = async (data) => {
  const serverdata = await hitServerApi("fetch_partners", data);
  return serverdata;
};

export const remove_to_wishlist = async (data) => {
  const serverdata = await hitServerApi("remove_to_wishlist", data);
  return serverdata;
};

export const cancel_order_user = async (data) => {
  const serverdata = await hitServerApi("cancel_order_user", data);
  return serverdata;
};

export const get_blog_categories = async (data) => {
  const serverdata = await hitServerApi("get_blog_categories", data);
  return serverdata;
};

export const get_blog_by_category = async (data) => {
  const serverdata = await hitServerApi("get_blog_by_category", data);
  return serverdata;
};

export const get_popular_blogs = async (data) => {
  const serverdata = await hitServerApi("get_popular_blogs", data);
  return serverdata;
};

export const get_related_blogs = async (data) => {
  const serverdata = await hitServerApi("get_related_blogs", data);
  return serverdata;
};

export const get_blog_details = async (data) => {
  const serverdata = await hitServerApi("get_blog_details", data);
  return serverdata;
};

export const get_insta_feeds = async (data) => {
  const serverdata = await hitServerApi("get_insta_feeds", data);
  return serverdata;
};

export const get_jobs = async (data) => {
  const serverdata = await hitServerApi("get_jobs", data);
  return serverdata;
};
export const get_collabarations = async (data) => {
  const serverdata = await hitServerApi("get_collabarations", data);
  return serverdata;
};

export const add_subscribes = async (data) => {
  const serverdata = await hitServerApi("add_subscribes", data);
  return serverdata;
};
export const get_recipe_details = async (data) => {
  const serverdata = await hitServerApi("get_recipe_details", data);
  return serverdata;
};

export const showAlertMessage = (
  title = "alert",
  message = "",
  success = false,
  danger = false
) => {
  const alert_config = {
    show_alert: true,
    title: title,
    message: message,
    success: success,
    danger: danger,
  };
  store.dispatch(showCustomAlert(alert_config));
};
