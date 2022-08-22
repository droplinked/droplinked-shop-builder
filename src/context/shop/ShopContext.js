import { createContext, useState, useContext } from "react";
import { getShop } from "../../api/base-user/Profile-api";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    
  let localShop = JSON.parse(localStorage.getItem("shop"));

  const [shop, setShop] = useState(localShop ? localShop : null);

  const updateShop = async () => {
    let result = await getShop();
    if (result) {
      setShop(result);
      localStorage.setItem("shop", JSON.stringify(result));
    }
  };

  const contextValues = {
    updateShop,
    shop,
  };

  return (
    <ShopContext.Provider value={contextValues}>
      {children}
    </ShopContext.Provider>
  );
};

// hook for use shop context
export const useShop = () => {
  const ctx = useContext(ShopContext);
  return {
    ...ctx,
  };
};

export default ShopProvider;
