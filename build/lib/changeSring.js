"use strict";
const toSnakeCase = (string) => {
    if (typeof string === 'number')
        return string.toString();
    return string.replace(/[A-Z]/g, (changeString, i) => {
        return (i === 0 ? '' : '_') + changeString.toLowerCase();
    });
};
const toCamelCase = (string) => {
    return string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, changeString) => changeString.toUpperCase());
};
const changeString = {
    toSnakeCase,
    toCamelCase,
};
module.exports = changeString;
