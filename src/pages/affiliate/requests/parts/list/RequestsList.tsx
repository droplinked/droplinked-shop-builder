import { Box, Flex, VStack } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import AppBadge from "components/shared/badge/AppBadge";
import { publisherRequestService } from "lib/apis/affiliate/shopServices";
import AffiliateDetailCard from "pages/affiliate/parts/detail/affiliateDetailCard";
import React, { useEffect } from "react";
import { useMutation } from "react-query";

function RequestsList() {
  const { mutate, isLoading, data } = useMutation(() =>
    publisherRequestService()
  );

  useEffect(() => mutate(), []);

  return (
    <VStack align={"stretch"}>
      {data?.data?.data
        ? data?.data?.data.map((el, key) => (
            <Flex
              key={key}
              justifyContent={"space-between"}
              borderTop="1px solid #262626"
              padding={"20px 0"}
            >
              <Box>
                <AffiliateDetailCard
                  image={el?.publisherShop[0].logo}
                  title={el?.product[0]?.title}
                  decript={el?.product[0]?.description}
                  options={[
                    {
                      caption: "Quantity",
                      value: el?.sku[0]?.quantity,
                    },
                    {
                      caption: "Commision",
                      value: "  -  ",
                    },
                  ]}
                  price={`$${el?.sku[0]?.price}   `}
                  earning=" - "
                />
              </Box>
              <Box>
                <AppBadge text={el?.status} />
              </Box>
            </Flex>
          ))
        : ""}
    </VStack>
  );
}

export default RequestsList;
