import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { appDeveloment } from "lib/utils/app/variable";
import orderModalContext from "components/modals/order-modal/context";
import React, { useCallback, useContext, useMemo } from "react";
import AppTypography from "components/common/typography/AppTypography";

function OrderDetailCost() {
  const { order } = useContext(orderModalContext);

  const data = [
    {
      caption: 'Total Product Cost',
      placeholder: null,
      value: order?.details?.totalProductCost ? parseFloat(order?.details?.totalProductCost).toFixed(2) : ''
    },
    {
      caption: 'Cost Of Good Sold',
      placeholder: null,
      value: order?.details?.totalOfGoodSold ? parseFloat(order?.details?.totalOfGoodSold).toFixed(2) : ''
    },
    {
      caption: 'Affiliate Share asd',
      placeholder: null,
      value: order?.details?.affiliateShare ? parseFloat(order?.details?.affiliateShare).toFixed(2) : ''
    }
  ]

  return (
    <VStack align="stretch">
      <AppTypography size="16px" weight="bolder" color="#FFF">Total Cost</AppTypography>
      <VStack align={"stretch"} spacing={3} color="#C2C2C2">
        {data.map((el, key) => el.value !== null ? (
          <HStack key={key} justifyContent={"space-between"} alignItems="center">
            <AppTypography size="12px">{el.caption}</AppTypography>
            {el.placeholder && <AppTypography size="12px" color="#808080">{el.placeholder}</AppTypography>}
            <AppTypography size="12px">{el.value ? '$' + el.value : "-"}</AppTypography>
          </HStack>
        ) : null)}
      </VStack>
    </VStack>
  );
}

export default OrderDetailCost;
