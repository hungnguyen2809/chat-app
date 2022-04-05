import axios, { AxiosRequestConfig } from 'axios';
import { merge } from 'lodash';
import QueryString from 'qs';
import { getLocalData } from 'services';
import { REACT_APP_AVATAR_API, REACT_APP_BASE_URL } from 'utils/env';

axios.defaults.timeout = 10000;
axios.defaults.timeoutErrorMessage = 'Connection timeout !';
axios.defaults.paramsSerializer = (params) => QueryString.stringify(params, { indices: false });

const configure = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = getLocalData('accessToken');

  const targetConfig: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return merge(config, targetConfig);
};

/** Request API without Authorization */
export const axiosAuth = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/api/v1`,
});

/** Request API with Authorization */
export const axiosClient = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/api/v1`,
});

axiosClient.interceptors.request.use(
  (config) => configure(config),
  (error) => Promise.reject(error)
);

/** Request API Multiavatar */
export const multiAvatarApi = axios.create({
  baseURL: REACT_APP_AVATAR_API,
});
