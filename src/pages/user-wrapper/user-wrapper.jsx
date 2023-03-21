import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserWrapperPage, PageContainer } from "./user-wrapper-style";
import { useApi } from "../../hooks/useApi/useApi";
import { getShopPublic } from "../../apis/shopApiService";

//import Sidebar from "../../layouts/sidebar/Sidebar"
import ShopInformationSidebar from "../../layouts/sidebar/components/shop-information-side/ShopInformationSidebar";
import { CRASHPUNKS_SHOPDATA } from "./crashpunks-information-hardcode";

const UserWrapper = () => {
  const [shopData, setShop] = useState(null);

  const { getApi } = useApi();
  let { shopname } = useParams();

  const getShopData = async () => {

    if(shopname === 'crashpunks'){
      setShop(CRASHPUNKS_SHOPDATA);
    }else{
      const result = await getApi(getShopPublic(shopname));
      if (result) setShop(result);
    }
    
  };

  useEffect(() => {
    getShopData();
  }, []);

  return (
    <UserWrapperPage>
      {shopData && <ShopInformationSidebar ShopData={shopData} />}
      <PageContainer>
        <Outlet />
      </PageContainer>
    </UserWrapperPage>
  );
};

export default UserWrapper;
