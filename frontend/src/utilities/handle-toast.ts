import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';

const isBackEndError = (err: any): err is AxiosError<{ message: string }> => {
  if (err.response.data) {
    return true;
  }
  return false;
};

const isStrapiError = (
  err: any
): err is AxiosError<{
  error: {
    message: string;
  };
}> => {
  if (err.response.data.error) {
    return true;
  }
  return false;
};

const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
    style: {
      zIndex: 99999999,
    },
  });
const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
    style: {
      zIndex: 99999999,
    },
  });

function handleError(err: any) {
  if (axios.isAxiosError(err)) {
    if (isStrapiError(err)) {
      return notifyError(err.response?.data.error.message as string);
    }

    if (isBackEndError(err)) {
      return notifyError(err.response?.data.message as string);
    }
  }

  if (err instanceof Error) {
    return notifyError(err.message);
  }

  if (typeof err === 'string') {
    return notifyError(err);
  }
}

export function handleSuccess(message: string) {
  return notifySuccess(message);
}

export default handleError;
