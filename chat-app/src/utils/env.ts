export const REACT_APP_PRODUCT = process.env.REACT_APP_PRODUCT === 'true';

export const REACT_APP_BASE_URL = REACT_APP_PRODUCT
  ? process.env.REACT_APP_BASE_URL_PROP
  : process.env.REACT_APP_BASE_URL_DEV;

export const REACT_APP_AVATAR_API = process.env.REACT_APP_AVATAR_API;
