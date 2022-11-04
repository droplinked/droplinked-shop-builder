import CrashpunksInfo from "./crashpunks-info/crashpunks-info";
import ShopInfo from "./shop-info/shop-info";

import { getShopInfoByShopname } from "../../../api/public/Shop-api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const [shopData, setShop] = useState(null);
  let { shopname } = useParams();

  useEffect(() => {
    getShopData(shopname);
  }, [shopname]);

  const getShopData = async (shop) => {
    let shopinfo = await getShopInfoByShopname(shop);
    setShop(shopinfo);
  };

  return (
    <>
      {shopname == "crashpunks" ? (
        <CrashpunksInfo />
      ) : (
        <> {shopData && <ShopInfo ShopData={shopData} />}</>
      )}
    </>
  );
};

export default Sidebar;
