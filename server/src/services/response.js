import { logger } from './logger';

export const ResponseService = {
  sucess: (data = {}, message = 'OK', status = 200) => {
    return { error: false, status, message, data };
  },
  error: (message = 'Failed', status = 200, data = null) => {
    logger.error(message);
    return { error: true, status, message, data };
  },
};
