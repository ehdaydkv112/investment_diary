"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const changeSring_1 = __importDefault(require("./changeSring"));
const where = async (data) => {
    const query = {
        where: {},
    };
    Object.keys(data).forEach((ele) => {
        query.where[changeSring_1.default.toSnakeCase(ele)] = data[ele];
    });
    return query;
};
const dataOne = async (data) => {
    const query = {
        data: {},
    };
    Object.keys(data).forEach((ele) => {
        query.data[changeSring_1.default.toSnakeCase(ele)] = data[ele];
    });
    return query;
};
const dataMany = async (data) => {
    const query = {
        data: [],
    };
    for (let i = 0; i < data.length; i += 1) {
        const changedObj = {};
        Object.keys(data[i]).forEach((key) => {
            changedObj[changeSring_1.default.toSnakeCase(key)] = data[i][key];
        });
        query.data.push(changedObj);
    }
    return query;
};
// const selectResult = async <T>(data: T) => {
//   const result = [];
//   for (let i = 0; i < data.length; i += 1) {
//     const changedKeyValue: any = {};
//     Object.keys(data[i]).forEach((key) => {
//       const selectResultSnakeCaseObj = data[i];
//       changedKeyValue[changeString.toCamelCase(key)] = selectResultSnakeCaseObj[key];
//     });
//     result.push(changedKeyValue);
//   }
//   return result;
// };
const queryObjBuilder = {
    where,
    dataOne,
    dataMany,
};
module.exports = queryObjBuilder;
