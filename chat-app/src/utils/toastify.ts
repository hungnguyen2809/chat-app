import { toast, ToastContent, ToastOptions } from 'react-toastify';

export const toastSuccess = (content: ToastContent, options?: ToastOptions) => {
  options && delete options.type;
  return toast.success(content, options);
};

export const toastInfo = (content: ToastContent, options?: ToastOptions) => {
  options && delete options.type;
  return toast.info(content, options);
};

export const toastWarning = (content: ToastContent, options?: ToastOptions) => {
  options && delete options.type;
  return toast.warning(content, options);
};

export const toastError = (content: ToastContent, options?: ToastOptions) => {
  options && delete options.type;
  return toast.error(content, options);
};
