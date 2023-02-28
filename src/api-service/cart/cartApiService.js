

export const getCart = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `cart`,
    token: token,
  };
  return { ...apiObj };
};
