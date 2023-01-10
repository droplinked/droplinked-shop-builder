import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getShopInfoByShopname } from "../../api/public/Shop-api";
import { useProfile } from "../../context/profile/ProfileContext";

import { SidebarWrapper } from "./Sidebar-style";
import { CRASHPUNKS_SHOPDATA } from "./crashpunks-information-hardcode";

import ShopInformationSidebar from "./components/shop-information-side/ShopInformationSidebar";
import ProducerSidebar from "./components/producer-side/ProducerSidebar";

const Sidebar = () => {
  const [shopData, setShop] = useState(null);
  let { shopname } = useParams();
  const { isRegisteredProducer } = useProfile();

  useEffect(() => {
    getShopData(shopname);
  }, [shopname]);

  const getShopData = async (shop) => {
    let shopinfo = await getShopInfoByShopname(shop);
    setShop(shopinfo);
  };

  return (
    <SidebarWrapper
      borderRight={(isRegisteredProducer())?"1px solid":"0px solid"}
      borderColor={{ base: "transparent", sm: "line" }}
    >
      {isRegisteredProducer() ? (
        <ProducerSidebar />
      ) : (
        <>
          {shopData && (
            <ShopInformationSidebar
              ShopData={
                shopname == "crashpunks" ? CRASHPUNKS_SHOPDATA : shopData
              }
            />
          )}
        </>
      )}
    </SidebarWrapper>
  );
};

export default Sidebar;
