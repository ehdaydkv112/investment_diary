"use strict";
const success = (data) => {
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
    customError: (msg, data) => {
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
module.exports = response;
