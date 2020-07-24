import axios from "axios";

const Error = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

const createApi = (onUnauthorized) => {
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

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
    } else if (response.status === Error.BAD_REQUEST) {
      // TODO:
    } else if (!response.status) {
      // TODO:
    }

    // Здесь применяется throw err, чтобы после запроса авторизации цепочка
    // промисов была прервана. Иначе, если запрос был неудачным, приложение этого не поймет.
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createApi};
