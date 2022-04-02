import axios from "axios";
import { Baseurl } from "../../Utils/baseurl";


export const postApi = (path, data) => {
  return axios.post(Baseurl + path, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer `
    }
  });
};

export const getApi = (path, data) => {

  return axios.get(Baseurl + path, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer `
    }
  });
};

export const putApi = (path, data) => {
  const token = localStorage.getItem("token");

  return axios.put(Baseurl + path, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
};

export const fileUpload = (path, data) => {
  const token = localStorage.getItem("token");

  return axios.post(Baseurl + path, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`
    }
  });
};

