import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { appDeveloment } from "lib/utils/app/variable";
import orderModalContext from "components/modals/order-modal/context";
import React, { useCallback, useContext, useMemo } from "react";
import AppTypography from "components/common/typography/AppTypography";

function OrderDetailCost() {
  const { order } = useContext(orderModalContext);

  const textTypes = {
    typeA: {
      fontSize: { base: "sm", sm: "md" },
      fontWeight: "extrabold",
    },
    typeB: {
      fontSize: { base: "sm", sm: "md" },
      color: "lightGray",
    },
  };

  const data = [
    {
      caption: 'Items',
      placeholder: `${order?.items.length} items`,
      value: order?.totalItemsAmount ? parseFloat(order?.totalItemsAmount).toFixed(2) : ''
    },
    {
      caption: 'Discount',
      placeholder: null,
      value: order?.totalDiscountAmount ? order?.totalDiscountAmount.toFixed(2) : ''
    },
    {
      caption: order?.shipmentData ? order?.shipmentData?.title : 'Shipping',
      placeholder: null,
      value: order?.shippingPrice ? parseFloat(order?.shipmentData ? order?.shipmentData?.price : order?.shippingPrice).toFixed(2) : ''
    },
    {
      caption: 'Order Tax',
      placeholder: null,
      value: order?.taxAmount ? order?.taxAmount.toFixed(2) : ''
    },
    {
      caption: 'Total Cost',
      placeholder: null,
      value: order?.totalPriceCart ? order?.totalPriceCart.toFixed(2) : ''
    },
    {
      caption: 'Total Crypto Payment',
      placeholder: null,
      value: order?.cryptoAmount ? order?.cryptoAmount : ''
    }
  ]

  return (
    <VStack align={"stretch"} spacing={3} color="#C2C2C2">
      {data.map((el, key) => el.value || el.placeholder ? (
        <HStack key={key} justifyContent={"space-between"} alignItems="center">
          <AppTypography size="12px">{el.caption}</AppTypography>
          {el.placeholder && <AppTypography size="12px" color="#808080">{el.placeholder}</AppTypography>}
          <Box>{el.value ? '$' + el.value : "-"}</Box>
        </HStack>
      ) : null)}
    </VStack>
  );
}

export default OrderDetailCost;
