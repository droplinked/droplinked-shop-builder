import { Box, Flex, Image, VStack } from "@chakra-ui/react";
import AppBadge from 'components/common/badge/AppBadge';
import Pagination from "components/common/datagrid/parts/pagination/Pagination";
import AppEmptyPage from 'components/common/empty/AppEmptyPage';
import IconBlockchain from "components/common/iconBlockchain/IconBlockchain";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import { IpublisherRequestService } from "lib/apis/affiliate/interfaces";
import { publisherRequestService } from "lib/apis/affiliate/shopServices";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";
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
          {list?.data.map((el: any, key: number) => {
            const element = el?.publisherShop[0]
            const product = el?.product[0]
            const sku = el?.sku[0]

            return (
              <VStack align="stretch" key={key} backgroundColor="#141414" spacing="12px" borderRadius="8px" padding="20px">
                <Flex justifyContent="space-between">
                  <Flex alignItems="center" gap="4px">
                    <AppTypography size="12px" paddingRight="10px" color="#808080">From:</AppTypography>
                    <Image src={element.logo} width="14px" height="14px" borderRadius="100%" />
                    <AppTypography size="12px" color="#2BCFA1">{element.name}</AppTypography>
                  </Flex>
                  <AppBadge fontSize="10px" padding="6px 24px" text={el?.status} />
                </Flex>
                <VStack width="100%" align="stretch" paddingLeft="44px" spacing="12px">
                  <Flex justifyContent="space-between" gap="12px">
                    <AppImage src={product?.media.find(el => el.isMain === 'true')?.thumbnail} width="68px" height="68px" borderRadius="8px" />
                    <Flex width="100%" justifyContent="space-between">
                      <VStack align="stretch" color="#C2C2C2">
                        <AppTypography size="14px">{product?.title}</AppTypography>
                        <AppTypography size="12px">quantity: {el?.quantity || "---"}</AppTypography>
                      </VStack>
                      <VStack align="stretch" color="#C2C2C2" textAlign="right">
                        <AppTypography size="12px">Commission: {sku?.recordData?.commision + '%'}</AppTypography>
                        <AppTypography size="12px">Price: {`${sku?.price} ${product?.priceUnit || ""}`}</AppTypography>
                        <AppTypography size="12px" display="flex">Your earning: <AppTypography padding="0 3px" size="12px" weight="bolder">{parseFloat(el?.publisherEarning).toFixed(2)} USD / each</AppTypography></AppTypography>
                      </VStack>
                    </Flex>
                  </Flex>
                  <Flex alignItems="center" gap="8px" color="#808080">
                    <IconBlockchain blockchain={el?.network} props={{ width: "12px", height: "12px" }} />
                    <AppTypography position="relative" top="2px" size="10px" display="flex">
                      Dropped on <AppTypography padding="0 3px" size="10px" weight='bolder'>{capitalizeFirstLetter(el?.network)}</AppTypography> blockchain
                    </AppTypography>
                  </Flex>
                </VStack>
              </VStack>
            )
          })}
          <Pagination current={list?.currentPage} lastPage={list?.totalPages || 1} nextPage={list?.nextPage} prevPage={list?.previousPage} />
        </VStack>
      )
        : <AppEmptyPage title="No requests to display at the moment!" />}
    </VStack>
  );
}

export default RequestsList;
