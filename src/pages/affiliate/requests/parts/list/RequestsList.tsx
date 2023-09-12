import { Box, Flex, VStack } from "@chakra-ui/react";
import AppBadge from 'components/common/badge/AppBadge';
import AppEmptyPage from 'components/common/empty/AppEmptyPage';
import { publisherRequestService } from "lib/apis/affiliate/shopServices";
import AffiliateDetailCard from "pages/affiliate/parts/detail/affiliateDetailCard";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import RequestSkeleton from "../skeleton/RequestSkeleton";

function RequestsList() {
  const { mutate, isLoading, data } = useMutation(() =>
    publisherRequestService()
  );

  useEffect(() => mutate(), []);

  return (
    <VStack align={"stretch"}>
      {isLoading ? <RequestSkeleton /> : data?.data?.data.length ? data?.data?.data.map((el: any, key: number) => (
        <Flex
          key={key}
          justifyContent={"space-between"}
          borderTop="1px solid #262626"
          padding={"20px 0"}
        >
          <Box width={"70%"}>
            <AffiliateDetailCard
              image={el?.product[0]?.media[0]?.url}
              title={el?.product[0]?.title}
              decript={el?.productCollection[0]?.title}
              options={[
                {
                  caption: "Quantity",
                  value: el?.quantity,
                },
                {
                  caption: "Commision",
                  value: el?.commision + '%',
                },
              ]}
              price={`${el?.sku[0]?.price} ${el?.product[0]?.priceUnit || ''}`}
              earning={el?.publisherEarning}
            />
          </Box>
          <Box>
            <AppBadge text={el?.status} />
          </Box>
        </Flex>
      ))
        : <AppEmptyPage title="No requests to display at the moment!" />}
    </VStack>
  );
}

export default RequestsList;
