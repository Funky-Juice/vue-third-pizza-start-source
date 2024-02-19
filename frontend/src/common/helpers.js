import doughSizes from "./enums/doughSizes";

export const normalizeDoughTypeObj = (data) => {
  return {
    ...data,
    type: data.id ? doughSizes[data.id] : "",
  };
};
