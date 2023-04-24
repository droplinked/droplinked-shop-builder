import { createApiReq } from "./api-utils";

export const getNotifications = () => {
    return createApiReq(`notification`, true, null);
  };

  export const getNotificationById = (notifId:number) => {
    return createApiReq(`notification/${notifId}`, true, null);
  };


  export const postSeenNotification = (notifId:number) => {
    return createApiReq(`notification/${notifId}`, true, null);
  };