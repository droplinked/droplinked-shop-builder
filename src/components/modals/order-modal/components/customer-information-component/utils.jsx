import { Box, HStack, Link, VStack } from "@chakra-ui/react"
import ClipboardText from "components/common/clipboardText/ClipboardText"
import hashkeyModel from "components/common/hashKey/model"
import AppTypography from "components/common/typography/AppTypography"

export const convertCustomerInformation = (order) => {
  if (!order || !order?.details?.customerAddress) return null

  return [
    {
      name: "name",
      data: order?.details?.customerName
    },
    {
      name: "Email",
      data: order?.details?.customerEmail || "-"
    },
    {
      name: "Address",
      data: order?.details?.customerAddress || "-"
    }
  ]
}

export const convertOrderInformation = (order) => {
  if (!order || !order?.details?.customerAddress) return null
  const linkTransction = order?.cartID?.paymentType && order?.transaction_id ? hashkeyModel.getLink({ blockchain: order?.cartID?.paymentType, hashkey: order?.transaction_id }) : null

  const result = [
    {
      name: "Order ID",
      data: order?._id
    },
    {
      name: "POD ID",
      data: order?.details?.podId || "-"
    },
    // {
    //   name: "Deploy Hash",
    //   data: order?.deployHash ? (
    //     <HStack justifyContent="space-between">
    //       <Box><a href={linkTransction || ""} style={{ color: "#FFF" }} target="_blank">{linkTransction.substr(0, 60)}...</a></Box>
    //       <Box><ClipboardText text={linkTransction || ""} /></Box>
    //     </HStack>
    //   ) : "-"
    // }
  ]

  if (order?.details?.shippingUrls && order?.details?.shippingUrls.length) {
    result.push({
      name: "Shipping Url",
      data: (
        <VStack align="stretch" spacing="20px">
          {order?.details?.shippingUrls.map((el, key) => (
            <VStack align="stretch" spacing="0" key={key}>
              <AppTypography size="10px" color="#777">({el?.name})</AppTypography>
              <Link href={el?.url} boxShadow="unset !important" target="_blank"><AppTypography size="12px" textDecor="underline">{el?.url}</AppTypography></Link>
            </VStack>
          ))}
        </VStack>
      )
    })
  }

  return result

}