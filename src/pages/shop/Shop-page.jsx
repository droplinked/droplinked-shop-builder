import "./Shop-page-style.scss";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getShopInfoByShopname } from "../../api/public/Shop-api";
import { getCollectionsByShopname } from "../../api/public/Collection-api";

import Loading from "../../components/shared/loading/Loading";

import TopSection from "../../components/shared/TopSection/TopSection";
import ProfileTopSection from "../Crashpunks-page/crashpunks top section/ProfileTopSection";
import GalleryCarousel from "../Crashpunks-page/gallery carousel/GalleryCarousel";
import ShopifyCollection from "./Shopify-collection";
import DroplinkedCollectin from "./Droplinked-collection";

export default function ShopPage() {
  // state for shop information
  const [shopData, setShop] = useState(null);
  // state for collections date
  const [collection, setCollections] = useState(null);

  let { shopname } = useParams();

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

  // check if doesnt exist any product in all collections dont show any collection
  const checkCollectionState = () => {
    if (collection == null) return false;

    let flag = false;
    collection.collections.forEach((collection) => {
      if (collection.products.length > 0) flag = true;
    });
    return flag;
  };
  //console.log(shopname) crashpunks

  return (
    <>
      {shopData == null ? (
        <Loading />
      ) : (
        <div className="shop-page-container">
          {shopname == "crashpunks" ? (
            <>
              <ProfileTopSection />
              <GalleryCarousel />
              <div style={{ height: "30px" }}></div>
            </>
          ) : (
            <TopSection
              pic={shopData.logo}
              shopname={shopData.description}
              instagram={shopData.instagramUrl ? shopData.instagramUrl : ""}
              twitter={shopData.twitterUrl ? shopData.twitterUrl : ""}
              discord={shopData.discordUrl ? shopData.discordUrl : ""}
              web={shopData.webUrl ? shopData.webUrl : ""}
            />
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "40px 20px 0px 20px",
            }}
          >
            {checkCollectionState() ? (
              // if exist any product show collections that have product
              <>
                {shopData.imsType == "SHOPIFY" ? (
                  <ShopifyCollection collection={collection} shopname={shopname}/>
                ) : (
                  <DroplinkedCollectin collection={collection} shopname={shopname}/>
                )}
                
              </>
            ) : (
              <p className="no-collection-text">No collections listed yet!</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
