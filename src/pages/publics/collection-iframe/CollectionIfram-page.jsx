import { useState, useEffect } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { getCollectionById } from "../../../api-service/collections/collectionApiService";
import { useParams } from "react-router-dom";

import FrameProduct from "./iframe-product-component";
import Loading from "../../../components/shared/loading/Loading";
import { useApi } from "../../../hooks/useApi/useApi";

const CollectionIframe = () => {
  const [Collection, setCollectin] = useState(null);

  const { getApi } = useApi()
  const collectionId = useParams().collectionId;
  const shopname = useParams().shopname;

  useEffect(() => {
    const getCollection = async (id) => {
      let result = await getApi(getCollectionById(id));
      if (result) setCollectin(result);
    };
    getCollection(collectionId);
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      top="0"
      left="0"
      pos="fixed"
      zIndex="50"
      bgColor="subLayer"
      justifyContent="center"
      alignItems="start"
      overflowY="auto"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "primary",
          borderRadius: "24px",
        },
      }}
    >
      <>
        {Collection ? (
          <Flex wrap="wrap" w="100%" justifyContent="start" alignItems="start">
            {Collection.products.map((product, i) => {
              return (
                <Box key={i} width={{ base: "100%", sm: "50%", md: "25%" }}>
                  <FrameProduct
                    title={product.title}
                    price={product.skus[0].price}
                    imageUrl={product.media[0].url}
                    id={product._id}
                    shopName={shopname}
                  />
                </Box>
              );
            })}
          </Flex>
        ) : (
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Loading />
          </Flex>
        )}
      </>
    </Flex>
  );
};

export default CollectionIframe;
