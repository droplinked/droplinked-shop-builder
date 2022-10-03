import { Box } from "@chakra-ui/react";
import { Outlet, useParams } from "react-router-dom";
import { ShopWrapperStyle, ShopDetailWrapper } from "./shop-wrapper-style";
import { useState, useEffect } from "react";
import { getShopInfoByShopname } from "../../../api/public/Shop-api";

import ShopInfo from "../components/shop-info-component/ShopInfo";

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
        {shopData && <ShopInfo ShopData={shopData} />}
      </ShopDetailWrapper>
      <Box w="100%">
        <Outlet />
      </Box>
    </ShopWrapperStyle>
  );
};

export default ShopWrapper;
