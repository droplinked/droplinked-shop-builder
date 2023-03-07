
///notification
export const getNotifications = () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `notification`,
      token: token,
    };
    return { ...apiObj };
  };

  export const getNotificationById = (notifId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `notification/${notifId}`,
      token: token,
    };
    return { ...apiObj };
  };


  export const postSeenNotification = (notifId:number) => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    let apiObj = {
      url: `notification/${notifId}`,
      token: token,
    };
    return { ...apiObj };
  };