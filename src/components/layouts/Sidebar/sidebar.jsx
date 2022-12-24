import CrashpunksInfo from "./crashpunks-info/crashpunks-info";
import ShopInfo from "./shop-info/shop-info";
import Profilebar from "./profile-bar/profile-bar";

import { getShopInfoByShopname } from "../../../api/public/Shop-api";
import { useProfile } from "../../../context/profile/ProfileContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { USER_TYPE } from "../../../constant/user-types";
import { SidebarWrapper } from "./sidebar-style";

const Sidebar = () => {
  const [shopData, setShop] = useState(null);
  let { shopname } = useParams();
  const { profile } = useProfile();

  useEffect(() => {
    getShopData(shopname);
  }, [shopname]);

  const getShopData = async (shop) => {
    let shopinfo = await getShopInfoByShopname(shop);
    setShop(shopinfo);
  };

  return (
    <>
      {
        <>
          {profile && profile.type == USER_TYPE.PRODUCER ? (
              <Profilebar />
          ) : (
            <>
              {shopname == "crashpunks" ? (
                <SidebarWrapper>
                  <CrashpunksInfo />
                </SidebarWrapper>
              ) : (
                <>
                  {" "}
                  {shopData && (
                    <SidebarWrapper>
                      <ShopInfo ShopData={shopData} />
                    </SidebarWrapper>
                  )}
                </>
              )}
            </>
          )}
        </>
      }
    </>
  );
};

export default Sidebar;
