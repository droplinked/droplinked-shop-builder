import { Box } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router-dom";
import { ShopWrapperStyle, ShopDetailWrapper } from "./shop-wrapper-style";
import { useState, useEffect } from "react";
import { getShopInfoByShopname } from "../../../api/public/Shop-api";

import ShopInfo from "../components/shop-info-component/ShopInfo";
import CrashpunksInfo from "../components/crashpunks-info-component/crashpunks-info";
const ShopWrapper = () => {
  const [shopData, setShop] = useState(null);
  let { shopname } = useParams();

  useEffect(() => {
    getShopData(shopname);
  }, [shopname]);

  const getShopData = async (shop) => {
    let shopinfo = await getShopInfoByShopname(shop);
    setShop(shopinfo);
  };

  console.log(shopData);

  return (
    <ShopWrapperStyle>
      <ShopDetailWrapper>
        {shopname == "crashpunks" ? (
          <CrashpunksInfo />
        ) : (
          <> {shopData && <ShopInfo ShopData={shopData} />}</>
        )}
      </ShopDetailWrapper>
      <Box w={{ base: "100%", md: "calc(100% - 250px)" }}>
        <Outlet />
      </Box>
    </ShopWrapperStyle>
  );
};

export default ShopWrapper;
