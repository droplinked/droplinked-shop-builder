//import "./Shop-page-style.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShopInfoByShopname } from "../../../api/public/Shop-api";
import { getCollectionsByShopname } from "../../../api/public/Collection-api";
import { ShopPageContainer } from "./Shop-page-style";
import { useProfile } from "../../../context/profile/ProfileContext";

import Loading from "../../../components/shared/loading/Loading";
import PublicShopPage from "./public/Public-shop-page";
import OwnerShopPage from "./owner/Owner-shop-page";

export default function ShopPage() {
  // state for shop information
  const [shopData, setShop] = useState(null);
  // state for collections date
  const [collection, setCollections] = useState(null);

  let { shopname } = useParams();
  const { profile } = useProfile();

  localStorage.setItem("currentShop", JSON.stringify(shopname));

  useEffect(() => {
    getShopData(shopname);
    getCollectionData(shopname);
  }, [shopname]);

  const getShopData = async (shop) => {
    let shopinfo = await getShopInfoByShopname(shop);
    setShop(shopinfo);
  };

  const getCollectionData = async (shop) => {
    let collections = await getCollectionsByShopname(shop);
    setCollections(collections);
  };

  const isOwner = () => {
    if (profile && profile.type == "PRODUCER" && profile.shopName == shopname)
      return true;
    else return false;
  };


  return (
    <>
      {shopData == null ? (
        <Loading />
      ) : (
        <ShopPageContainer>
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
        </ShopPageContainer>
      )}
    </>
  );
}
