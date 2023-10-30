import { Box, HStack } from "@chakra-ui/react"
import ClipboardText from "components/common/clipboardText/ClipboardText"
import hashkeyModel from "components/common/hashKey/model"

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

  return [
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

}