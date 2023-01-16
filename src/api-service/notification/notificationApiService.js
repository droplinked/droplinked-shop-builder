

export const getNotifications = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  let apiObj = {
    url: `notification`,
    token: token,
  };
  return { ...apiObj };
};
