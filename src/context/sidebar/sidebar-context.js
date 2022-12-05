import { createContext, useState, useContext } from "react";
//import { useToasty } from "../../context/toastify/ToastContext";



export const SideBarContext = createContext();

export default function SideBarProvider({ children }) {

  const [showSideBar, setShowSideBar] = useState(false);

  const openSideBar = () => setShowSideBar(true)

  const closeSideBar = () => setShowSideBar(false)

  const contextValues = {
    showSideBar,
    openSideBar ,
    closeSideBar
  };

  return (
    <SideBarContext.Provider value={contextValues}>
      {children}
    </SideBarContext.Provider>
  );
}

export const useSideBar = () => {
  const atx = useContext(SideBarContext);

  return {
    ...atx,
  };
};
