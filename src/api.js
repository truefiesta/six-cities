import axios from "axios";

const Error = {
  UNAUTHORIZED: 401,
};

const createApi = (onUnauthorized, onError) => {
  const api = axios.create({
    baseURL: `https://4.react.pages.academy/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response) {
      if (response.status === Error.UNAUTHORIZED && response.config.method === `post`) {
        onUnauthorized();
      } else if (response.status !== Error.UNAUTHORIZED) {
        onError(err.message);
      }
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createApi};
