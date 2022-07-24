import { createContext, useState, useContext} from "react";
import { getNotifications , seenNotification} from "../../api/base-user/Notification-api"


export const NotContext = createContext();

export default function NotContextProvider({ children }) {
   const [notifications, setNotifications] = useState([]);



  const updateNotifications = async() => {
    let result = await getNotifications()
    if(result != null) setNotifications(result)
  };


const seenNotif = async(id) => {
 await seenNotification(id)
 await updateNotifications()
} 


  const ContextValue = {
    notifications,
    updateNotifications ,
    seenNotif
  };

  return (
    <NotContext.Provider value={ContextValue}>
      {children}
    </NotContext.Provider>
  );
}

export const useNotifications = () => {
   
  const ctx = useContext(NotContext)

  return {
      ...ctx
  }
}
