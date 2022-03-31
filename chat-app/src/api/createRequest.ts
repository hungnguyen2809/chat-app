import axios, { AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';
import QueryString from 'qs';
import { REACT_APP_BASE_URL } from 'utils/env';

axios.defaults.paramsSerializer = (params) => QueryString.stringify(params, { indices: false });

/**  */
export const axiosClient = axios.create({
  baseURL: REACT_APP_BASE_URL,
});

const configure = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const targetConfig: AxiosRequestConfig = {
    headers: {
      Authentication: 'token-HgedhdYIeqwkndkhdh567',
    },
  };
  return merge(config, targetConfig);
};

axiosClient.interceptors.request.use(
  (config) => {
    return configure(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
