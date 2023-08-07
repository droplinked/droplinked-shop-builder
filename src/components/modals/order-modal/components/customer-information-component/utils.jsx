import { Box, HStack } from "@chakra-ui/react"
import ClipboardText from "components/common/clipboardText/ClipboardText"
import hashkeyModel from "components/common/hashKey/model"

export const convertCustomerInformation = (order) => {
  if (!order || !order.customerAddressBook) return null

  const { firstName, lastName, addressLine1, city, state, country, zip } = order.customerAddressBook

  return [
    {
      name: "Customer",
      data: `${firstName} ${lastName}`
    },
    {
      name: "Email",
      data: order?.customerEmail ? order?.customerEmail : "-"
    },
    {
      name: "Address",
      data: `${addressLine1} ${city} ${state} ${country} ${zip} `
    }
  ]
}

export const convertOrderInformation = (order) => {
  if (!order || !order.customerAddressBook) return null
  const linkTransction = order?.paymentType ? hashkeyModel.getLink({ blockchain: order?.paymentType, hashkey: order?.transaction_id }) : null
  return [
    {
      name: "Order ID",
      data: order?._id
    },
    {
      name: "POD ID",
      data: order?.pod_order_id || "-"
    },
    {
      name: "Shipping Url",
      data: "-"
    },
    {
      name: "Deploy Hash",
      data: order?.transaction_id ? (
        <HStack justifyContent="space-between">
          <Box><a href={linkTransction || ""} style={{ color: "#FFF" }} target="_blank">{order?.transaction_id}</a></Box>
          <Box><ClipboardText text={linkTransction || ""} /></Box>
        </HStack>
      ) : "-"
    }
  ]

}