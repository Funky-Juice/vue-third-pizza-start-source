export const normalizeDataObj = (data, enumObj) => {
  return {
    ...data,
    type: data.id ? enumObj[data.id] : "",
  };
};

export const getImage = (image) => {
  return new URL(`/src/assets/img/${image}`, import.meta.url).href;
};
