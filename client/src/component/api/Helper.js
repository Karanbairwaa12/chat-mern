import { unprotectedPaths } from "../utils/Constants";
import swalService from "../utils/SwalServices";
const herokuappUrl = "https://deeporionback-0cd6e44c3c14.herokuapp.com/";

const responseInterceptor = async (response, navigate, formData = false) => {
  const result = formData ? response : await response.json();
  if (response.status === 401) {
    swalService.showWarning({ title: "Unauthorized" });
    navigate("/login");
  } else {
    return { response: result, status: response?.status };
  }
};

const requestInterceptor = (navigate) => {
  const token = JSON.parse(localStorage.getItem('userLoginToken'))?.token;
  if(!unprotectedPaths.includes(window.location.pathname)) {
    if(token) {
      return token;
    }else{
      swalService.showWarning({ title: "Unauthorized" });
      navigate("/login");
    }
  }else{
    return '';
  }
}

var Helper = {
  post: async (jsonObj = {}, path = "", formData = false, navigate) => {
    const token = requestInterceptor(navigate);
    if (formData) {
      const url = herokuappUrl + path;
      const result = await fetch(url, {
        method: "POST",
        body: jsonObj,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: token,
        },
      });
      return responseInterceptor(result, navigate, formData);
    } else {
      const url = herokuappUrl + path;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(jsonObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return responseInterceptor(res, navigate);
    }
  },

  put: async (jsonObj = {}, path = "", formData = false, navigate) => {
    const token = requestInterceptor(navigate);
    if (formData) {
      const url = herokuappUrl + path;
      const res = await fetch(url, {
        method: "PUT",
        body: jsonObj,
        headers: {
          Authorization: token,
        },
      });
      return responseInterceptor(res, navigate, formData);
    } else {
      const url = herokuappUrl + path;
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(jsonObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return responseInterceptor(res, navigate);
    }
  },

  delete: async (path = "", navigate) => {
    const token = requestInterceptor(navigate);
    const url = herokuappUrl + path;
    const res = await fetch(url, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });
    return responseInterceptor(res, navigate);
  },

  get: async (path = "", navigate) => {
    const token = requestInterceptor(navigate);
    const url = herokuappUrl + path;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return responseInterceptor(res, navigate);
  },
};
export default Helper;
