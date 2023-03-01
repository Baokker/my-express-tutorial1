import axios from "axios";
import store from "@/store";
import { getToken } from "@/utils/auth";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    console.log(config)

    if (store.state.token != undefined) {
      // let each request carry token
      // ['authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    console.log(response)
    return response.data;
  },
  (error) => {
    console.log("err" + error); // for debug
    alert(error.data);
    return Promise.reject(error);
  }
);

export default service;
