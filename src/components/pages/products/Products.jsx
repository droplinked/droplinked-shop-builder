import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ProductItems from "./ProductItems";
import { SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState, useRef, useContext } from "react";
import Loading from "../../features/loading/Loading";
import useDate from "../../../sevices/hooks/useData"


function Products({ productHeader }) {
  const [products] = useDate();
  console.log(products);
  //const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   console.log(products);
  //   getData();
  // }, []);

  return (
    <>
      {/* items */}
      <Box color={"white"}>
        {/* product title */}
        <Text fontWeight={"semibold"} fontSize="3xl" pb="7">
          {productHeader}
        </Text>

        {(products == undefined) ? (
          <Loading />
        ) : (
          <SimpleGrid columns={[1, 2, 4, 4, 4]} gap={6}>
            {/* this is just for test, another day we wanna get data from server */}
            {products.map((item, index) => {
              return (
                <ProductItems
                  imageURL={item.product_listing.images[0].src}
                  brandName={item.product_listing.title}
                  cost={item.product_listing.variants[0].price}
                  id={index}
                />
              );
            })}
          </SimpleGrid>
        )}
        {/* grid section for make products like columns */}
      </Box>
    </>
  );

  // function getData() {
  //   axios
  //     .post(
  //       "https://r4qwnd5837.execute-api.us-west-2.amazonaws.com/v1/search",
  //       {
  //         keyword: "tshirt",
  //         page: 1,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.shopify);
  //       setProducts(response.data.shopify);
  //       setLoading(false);
  //     });
  // }
}

// default props
Products.defaultProps = {
  productHeader: "Products",
};

// proptypes
Products.propTypes = {
  productHeader: PropTypes.string,
};

export default Products;
