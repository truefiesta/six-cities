import axios from "axios";

const createApi = () => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  return api;
};

export {createApi};
