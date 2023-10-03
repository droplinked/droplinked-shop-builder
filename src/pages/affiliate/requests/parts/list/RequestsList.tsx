import { Box, Flex, VStack } from "@chakra-ui/react";
import AppBadge from 'components/common/badge/AppBadge';
import Pagination from "components/common/datagrid/parts/pagination/Pagination";
import AppEmptyPage from 'components/common/empty/AppEmptyPage';
import { IpublisherRequestService } from "lib/apis/affiliate/interfaces";
import { publisherRequestService } from "lib/apis/affiliate/shopServices";
import AffiliateDetailCard from "pages/affiliate/parts/detail/affiliateDetailCard";
import React, { useCallback, useEffect, useMemo } from "react";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import RequestSkeleton from "../skeleton/RequestSkeleton";

function RequestsList() {
  const [searchParams] = useSearchParams()
  const { mutate, isLoading, data } = useMutation((params: IpublisherRequestService) => publisherRequestService(params));
  const list = data?.data?.data
  const page = useMemo(() => searchParams.get("page"), [searchParams]) || 1

  const fetch = useCallback(() => mutate({ page }), [page, searchParams])

  useEffect(() => fetch(), [page])

  return (
    <VStack align={"stretch"}>
      {isLoading ? <RequestSkeleton /> : list?.data.length ? (
        <VStack align="stretch">
          {list?.data.map((el: any, key: number) => (
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
                  earning={parseFloat(el?.publisherEarning).toFixed(2)}
                />
              </Box>
              <Box>
                <AppBadge text={el?.status} />
              </Box>
            </Flex>
          ))}
          <Pagination current={list?.currentPage} lastPage={list?.totalPages || 1} nextPage={list?.nextPage} prevPage={list?.previousPage} />
        </VStack>
      )
        : <AppEmptyPage title="No requests to display at the moment!" />}
    </VStack>
  );
}

export default RequestsList;
