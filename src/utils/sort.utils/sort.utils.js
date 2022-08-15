

// get array of objects that contains createdAt
export const sortArrayBaseCreateTime = (arrayData) => {
  let newArray = arrayData;
  newArray.sort((a, b) => {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
  return newArray
};
