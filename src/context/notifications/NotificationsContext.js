import { createContext, useState, useContext} from "react";
import { getNotifications } from "../../api/BaseUser-apis/Notification-api"


export const NotContext = createContext();

export default function NotContextProvider({ children }) {
   const [notifications, setNotifications] = useState([]);



  const updateNotifications = async() => {
    let result = await getNotifications()
    if(result != null) setNotifications(result)
  };



  const ContextValue = {
    notifications,
    updateNotifications
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
