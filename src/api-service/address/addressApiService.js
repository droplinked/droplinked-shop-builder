export const getAddress = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `address`,
    token: token,
  };
  return { ...apiObj };
};
