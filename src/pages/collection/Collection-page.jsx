import "./Collection-page-style.scss";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../../components/shared/loading/Loading";
import Product from "../../components/shared/Product/Product";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCollectionById } from "../../api/public/Collection-api";
import { SHOP_TYPES } from "../../constant/shop-types";
import { USER_TYPE } from "../../constant/user-types"

export default function CollectionPage() {

  const [Collection, setCollectin] = useState(null);

  const { collectionId, shopname } = useParams();
console.log("s")
  useEffect(() => {
    getCollections(collectionId);
  }, []);

  const getCollections = async (id) => {
    let coll = await getCollectionById(id);
    setCollectin(coll);
  };

  const collectionType =
    Collection && (Collection.products.length > 0) && Collection.products[0].shopifyData
      ? SHOP_TYPES.SHOPIFY
      : SHOP_TYPES.DROPLINKED;

  return (
    <>
      <div className="view-collcetion-page-wrapper">
        {Collection ? (
          <>
            <div className="title">{Collection.title}</div>
            {(Collection.products.length > 0)
            ?
            <div className=" mt-5 d-flex flex-wrap">
              {Collection.products.map((product, i) => {
                return (
                  <div key={i} className="col-6 col-md-3 p-1">
                    {collectionType == SHOP_TYPES.SHOPIFY ? (
                      <Product
                        shopname={shopname}
                        id={product._id}
                        title={product.shopifyData.title}
                        imageUrl={
                          product.shopifyData.images.length > 0 &&
                          product.shopifyData.images[0].src
                        }
                        type={USER_TYPE.CUSTOMER}
                      />
                    ) : (
                      <Product
                        shopname={shopname}
                        id={product._id}
                        title={product.title}
                        imageUrl={product.media[0].url}
                        type={USER_TYPE.CUSTOMER}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            :
            <div className="d-flex justify-content-center title" style={{fontSize:'16px' , marginTop:'60px'}}>Empty</div>
            }
            
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
