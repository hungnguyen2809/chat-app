import { get } from 'lodash';

export const MESSAGE_ERR = 'Something went wrong !';

/**
 * @param error object error
 * @param path get error for path, default: message
 */
export const getMessageError = (error: any, path = 'message'): string => {
  return get(error, path, MESSAGE_ERR);
};
