import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { appDeveloment } from "lib/utils/app/variable";
import orderModalContext from "components/modals/order-modal/context";
import React, { useCallback, useContext, useMemo } from "react";
import AppTypography from "components/common/typography/AppTypography";
import { capitalizeFirstLetter } from "lib/utils/heper/helpers";

function OrderModalPayment() {
  const { order } = useContext(orderModalContext);
  const appliedes = order?.details?.appliedDiscountCode || order?.details?.appliedCreditCode

  const data = useMemo(() => order && order?.details ? [
    {
      caption: 'Items',
      placeholder: `${order?.details?.items.count} items`,
      value: order?.details?.items.amount ? parseFloat(order?.details?.items.amount).toFixed(2) : ''
    },
    ...order.details?.shippings && order.details?.shippings.length ? order.details?.shippings.map(element => ({
      caption: capitalizeFirstLetter(element.type) + ' Shipping',
      placeholder: null,
      value: element.amount ? parseFloat(element.amount).toFixed(2) : ''
    })) : [],
    {
      caption: 'Order Tax',
      placeholder: null,
      value: order?.details?.orderTax ? parseFloat(order?.details?.orderTax).toFixed(2) : ''
    },
    {
      caption: 'Total Rules Discounts',
      placeholder: order?.details?.totalRulesDiscounts?.count ? order?.details?.totalRulesDiscounts?.count + ' items' : null,
      value: order?.details?.totalRulesDiscounts?.amount ? parseFloat(order?.details?.totalRulesDiscounts?.amount).toFixed(2) : ''
    },
    {
      caption: order?.details?.appliedDiscountCode ? 'Applied Discount Code' : 'Applied Credit Code',
      placeholder: appliedes?.count,
      value: appliedes?.amount ? parseFloat(appliedes?.amount).toFixed(2) : ''
    },
    {
      caption: 'shipping Cost',
      placeholder: null,
      value: order?.details?.shippingCost ? parseFloat(order?.details?.shippingCost).toFixed(2) : ''
    },
    {
      caption: 'Total Cost',
      placeholder: null,
      value: order?.details?.totalCost ? parseFloat(order?.details?.totalCost).toFixed(2) : ''
    }
  ] : [], [order])

  return (
    <VStack align="stretch">
      <AppTypography size="16px" weight="bolder" color="#FFF">Customer Payment Detail</AppTypography>
      <VStack align={"stretch"} spacing={3} color="#C2C2C2">
        {data.map((el, key) => el.value || el.placeholder ? (
          <HStack key={key} justifyContent={"space-between"} alignItems="center">
            <AppTypography width="40%" size="12px">{el.caption}</AppTypography>
            {el.placeholder && <AppTypography width="20%" textAlign="center" size="12px" color="#808080">{el.placeholder}</AppTypography>}
            <AppTypography width="40%" textAlign="right" size="12px">{el.value ? '$' + el.value : "-"}</AppTypography>
          </HStack>
        ) : null)}
      </VStack>
    </VStack>
  );
}

export default OrderModalPayment;
