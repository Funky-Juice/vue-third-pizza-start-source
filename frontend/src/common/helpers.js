export const normalizeDataObj = (data, enumObj) => {
  return {
    ...data,
    type: data.id ? enumObj[data.id] : "",
  };
};
