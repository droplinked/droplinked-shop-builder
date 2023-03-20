import Loading from "../../../components/shared/loading/Loading";
import Product from "../../../components/shared/Product/Product";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { getCollectionById } from "../../../api-service/collections/collectionApiService";
import { getCollectionPublicById } from "../../../apis/collectionApiService";
import { SHOP_TYPES } from "../../../constant/shop-types";
import { USER_TYPE } from "../../../constant/user-types";
import { CollectionPageWrapper, HeaderTitle } from "./Collection-page-style";
import { Flex, Box } from "@chakra-ui/react";
import { useApi } from "../../../hooks/useApi/useApi";

export default function CollectionPage() {
  const [Collection, setCollectin] = useState(null);

  const { collectionId, shopname } = useParams();
  const { getApi } = useApi()

  useEffect(() => {
    getCollections(collectionId);
  }, []);

  const getCollections = async (id) => {
    let result = await getApi(getCollectionPublicById(id));
    if (result) setCollectin(result);
  };
  console.log('collections ' , Collection);

  const collectionType =
    Collection &&
    Collection.products.length > 0 &&
    Collection.products[0].shopifyData
      ? SHOP_TYPES.SHOPIFY
      : SHOP_TYPES.DROPLINKED;

  return (
    <>
      <CollectionPageWrapper>
        {Collection ? (
          <>
            <HeaderTitle>{Collection.title}</HeaderTitle>
            {Collection.products.length > 0 ? (
              <Flex mt="30px" flexWrap="wrap">
                {Collection.products.map((product, i) => {
                  return (
                    <Box w={{ base: "50%", md: "25%" }} p="5px" key={i}>
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
                    </Box>
                  );
                })}
              </Flex>
            ) : (
              <HeaderTitle>Empty</HeaderTitle>
            )}
          </>
        ) : (
          <Loading />
        )}
      </CollectionPageWrapper>
    </>
  );
}
