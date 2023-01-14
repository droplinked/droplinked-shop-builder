// import { createContext, useState, useContext } from "react";
// import {
//   getNotifications,
//   seenNotification,
// } from "../../api/base-user/Notification-api";
// import { sortArrayBaseCreateTime } from "../../utils/sort.utils/sort.utils";

// export const NotContext = createContext();

// export default function NotificationProvider({ children }) {
//   const [notifications, setNotifications] = useState([]);


//   const updateNotifications = async () => {
//     let result = await getNotifications();
//     result = sortArrayBaseCreateTime(result);
//     if (result != null) setNotifications(result);
//   };


//   const seenNotif = async (id) => {
//     await seenNotification(id);
//     await updateNotifications();
//   };

//   const unseenNotifList = () => {
//     if (notifications.length > 0) {
//       let unseens = notifications.filter(
//         (notification) => notification.seen == false
//       );
//       return unseens;
//     } else {
//       return [];
//     }
//   };


//   const ContextValue = {
//     notifications,
//     updateNotifications,
//     unseenNotifList,
//     seenNotif,
//   };

//   return (
//     <NotContext.Provider value={ContextValue}>{children}</NotContext.Provider>
//   );
// }

// export const useNotifications = () => {
//   const ctx = useContext(NotContext);

//   return {
//     ...ctx,
//   };
// };
