export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let apiObj = {
    url: `user`,
    token: token,
  };
  return { ...apiObj };
};
