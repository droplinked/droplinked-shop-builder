//import "./Shop-page-style.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCollectionsByShopname } from "../../../api-service/collections/collectionApiService";
import { ShopPageContainer, ShopnotFind } from "./Shop-page-style";
import { useSelector } from "react-redux";
import { selectCurrentProfile } from "../../../store/profile/profile.selector";
import { useApi } from "../../../hooks/useApi/useApi";
import { getShopInformationByName } from "../../../api-service/shop/shopApiService";
import { Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BasicButton from "../../../components/shared/BasicButton/BasicButton";
import Loading from "../../../components/shared/loading/Loading";
import PublicShopPage from "./public/Public-shop-page";
import OwnerShopPage from "./owner/Owner-shop-page";

export default function ShopPage() {
  // state for shop information
  const [shopData, setShop] = useState(null);
  // state for collections date
  const [collection, setCollections] = useState(null);

  let { shopname } = useParams();
  const { getApi } = useApi();
  const profile = useSelector(selectCurrentProfile);
  const navigate = useNavigate();

  localStorage.setItem("currentShop", JSON.stringify(shopname));

  useEffect(() => {
    getShopData();
    getCollectionData(shopname);
  }, [shopname]);

  const getShopData = async () => {
    let result = await getApi(getShopInformationByName(shopname));
    console.log('result ' ,result)
    if (result) setShop(result);
  };

  const getCollectionData = async () => {
    let result = await getApi(getCollectionsByShopname(shopname));
    if (result) setCollections(result);
  };

  const isOwner = () => {
    if (profile && profile.type == "PRODUCER" && profile.shopName == shopname)
      return true;
    else return false;
  };

  const navigateToLandingpage = () => navigate("/");

  return (
    <>
      {shopData == null ? (
        <Loading />
      ) : (
        <ShopPageContainer>
          {shopData == false ? (
            <Box>
              <ShopnotFind>Shop not found</ShopnotFind>
              <Flex pt="88px" justifyContent="center">
                <BasicButton w="50%" click={navigateToLandingpage}>
                  Claim your shop now
                </BasicButton>
              </Flex>
            </Box>
          ) : (
            <>
              {isOwner() ? (
                <OwnerShopPage
                  shopData={shopData}
                  shopName={shopname}
                  collections={collection}
                  update={getCollectionData}
                />
              ) : (
                <PublicShopPage
                  shopData={shopData}
                  shopName={shopname}
                  collections={collection}
                />
              )}
            </>
          )}
        </ShopPageContainer>
      )}
    </>
  );
}
