

// get array of objects that contains createdAt
export const sortArrayBaseCreateTime = (arrayData) => {
  let newArray = arrayData;
  newArray.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  return newArray
};
