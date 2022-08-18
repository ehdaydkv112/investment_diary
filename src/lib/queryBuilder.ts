import changeString from './changeSring';

const where = async (data: { [key: string]: any }) => {
  const query: any = {
    where: {},
  };
  Object.keys(data).forEach((ele) => {
    query.where[changeString.toSnakeCase(ele)] = data[ele];
  });
  return query;
};

const dataOne = async (data: { [key: string]: any }) => {
  const query: any = {
    data: {},
  };
  Object.keys(data).forEach((ele) => {
    query.data[changeString.toSnakeCase(ele)] = data[ele];
  });
  return query;
};

const dataMany = async (data: [{ [key: string]: any }]) => {
  const query: any = {
    data: [],
  };
  for (let i = 0; i < data.length; i += 1) {
    const changedObj: any = {};
    Object.keys(data[i]).forEach((key) => {
      changedObj[changeString.toSnakeCase(key)] = data[i][key];
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

export = queryObjBuilder;
