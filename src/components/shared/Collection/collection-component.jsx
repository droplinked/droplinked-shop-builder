import { useNavigate, useParams } from "react-router-dom";
import { Flex, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { BASE_URL } from "../../../api/BaseUrl";

import Product from "../Product/Product";
import IframeSnipped from "../../Modal/Iframe-snipped-modal/Iframe-snipped-modal";
import ShopifyCollection from "./shopify-collection.component";
// collection format : {
//     ._id: id
//     products:[]
//     title : string
// }

export default function Collection({ collection, shopname, type }) {
  // state for open and close snipped modal
  const [snippedModal, setSnippedModal] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  // collection iframe code
  let iframeCode = `<iframe  
    style={{width:'100%' , height:"100%"  , overflow:'hidden' }}
            scrolling="no"
                title='product'
                src='${window.location.origin}/collection-iframe/${param.shopname}/${collection._id}'
                allowFullScreeng
            />`;

  const link = ` ${BASE_URL}/public/collection/${collection._id}`;

  // opent collection page
  const seeMore = () => {
    navigate(`/${shopname}/collection/${collection._id}`);
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="start"
        flexDirection="column"
        w="100%"
        maxW="750px"
        mb={{ base: "20px", md: "30px" }}
        p="10px 10px 0px 10px"
      >
        {/* head */}
        <Flex w="100%" justifyContent="space-between" h="auto" mb="10px">
          <Text
            color="#fff"
            fontSize={{ base: "10px", sm: "16px", md: "22px" }}
            fontWeight="600"
          >
            {collection.title}
          </Text>
          <Flex>
            <Flex
              p={{ base: "4px 10px 1px 10px", md: "4px 20px" }}
              color="#fff"
              bgColor="#353536"
              fontSize={{ base: "6px", sm: "8px", md: "14px" }}
              fontWeight="500"
              borderRadius="8px"
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              _hover={{
                bgColor: "#555558",
              }}
              onClick={() => {
                setSnippedModal(true);
              }}
            >
              Embed collection
            </Flex>
            <Flex
              p={{ base: "4px 10px 1px 10px", md: "4px 20px" }}
              color="#fff"
              bgColor="#353536"
              fontSize={{ base: "6px", sm: "8px", md: "14px" }}
              fontWeight="500"
              borderRadius="8px"
              justifyContent="center"
              alignItems="center"
              ml="10px"
              cursor="pointer"
              _hover={{
                bgColor: "#555558",
              }}
              onClick={seeMore}
            >
              See more
            </Flex>
          </Flex>
        </Flex>
        {/* head */}
        {type == "SHOPIFY" ? (
          <>
            <Flex w="100%" wrap="wrap">
              {collection.products.map((product, i) => {
                return (
                  <Box key={i} w={{ base: "50%", md: "25%" }} p="3px">
                    <ShopifyCollection key={i} product={product.shopifyData} id={product._id} shopname={shopname} />
                  </Box>
                );
              })}
            </Flex>
          </>
        ) : (
          <>
            {collection.products.length == 0 && (
              <Text
                color="#fff"
                fontSize={{ base: "18px", md: "24px" }}
                fontWeight="600"
                w="100%"
                textAlign="center"
                mt="30px"
              >
                Empty
              </Text>
            )}

            <Flex w="100%" wrap="wrap">
              {collection.products.map((product, i) => {
                if (i < 4) {
                  return (
                    <Box key={i} w={{ base: "50%", md: "25%" }} p="3px">
                      <Product
                        title={product.title}
                        imageUrl={product.media[0].url}
                        id={product._id}
                        shopname={shopname}
                      />
                    </Box>
                  );
                }
              })}
            </Flex>
          </>
        )}
      </Flex>
      {snippedModal && (
        <IframeSnipped
          link={link}
          code={iframeCode}
          close={() => {
            setSnippedModal(false);
          }}
        />
      )}
    </>
  );
}
