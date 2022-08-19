const success = (data: { [key: string]: any }) => {
  return {
    msg: 'success',
    data,
  };
};

const error = {
  catchError: () => {
    return {
      msg: 'catchErr',
      data: {},
    };
  },
  customError: (msg: string, data: any) => {
    return {
      msg,
      data,
    };
  },
};

const response = {
  success,
  error,
};

export = response;
