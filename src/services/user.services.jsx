import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL=process.env.REACT_APP_BASE_URL


export function axios_interceptor() {
  axios.interceptors.request.use(request => {
    // add auth header with jwt if account is logged in and request is to the api url
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `${token}`;
    }
    return request;
  },
    error => {
      alert(error)
      return Promise.reject(error);
    }
  );


  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error?.response?.status == 401 && error?.response?.data == "Unauthorized") {
      // toast.error("Session Expired, Plesse login again");
      // localStorage.clear();
      console.error("Session expired. Please login again. ------>");
      localStorage.removeItem("token"); // Remove only the token, not all data
      localStorage.removeItem("user");
      sessionStorage.removeItem("sessionData");
      sessionStorage.clear();
      //   setTimeout(() => {
      //     window.location.href = "https://www.clinicaledify.com/"
      //   }, 5000);

      // window.location.reload();    
    } else {
      if (typeof error.response.data == "string") {
        // // toast.error(error.response.data)
      } else if (typeof error.response.data == "object") {
        //  // toast.error(error.response.data.errors.msg)
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
}





export async function Get(url, body, limit = 100, offset = 0) {
  try {
    var res = await axios.get(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Post(url, body) {
  try {
    var res = await axios.post(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Delete(url, body) {
  try {
    var res = await axios.delete(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}

export async function Patch(url, body) {
  try {
    var res = await axios.patch(`${BASE_URL}${url}`, body);
    return res;
  } catch (error) {

    throw (error)
  }
}
