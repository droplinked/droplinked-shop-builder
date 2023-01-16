

export const getNotifications = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  let apiObj = {
    url: `notification`,
    token: token,
  };
  return { ...apiObj };
};


export const postSeenNotification = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
  
    let apiObj = {
      url: `notification/seen/${id}`,
      token: token,
    };
    return { ...apiObj };
  };
