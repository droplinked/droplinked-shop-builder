

export const postAddProduct = (productObj) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product`,
    body: productObj,
    token: token,
  };
  return { ...apiObj };
};




export const getVariants = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `producer/product/variant`,
    token: token,
  };
  return { ...apiObj };
};
