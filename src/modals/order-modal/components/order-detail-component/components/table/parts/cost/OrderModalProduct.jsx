import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { appDeveloment } from 'lib/utils/app/variable'
import orderModalContext from 'modals/order-modal/context'
import React, { useCallback, useContext } from 'react'

function OrderDetailCost() {
  const { order } = useContext(orderModalContext)

  const textTypes = {
    typeA: {
      fontSize: { base: "sm", sm: "md" },
      fontWeight: "extrabold"
    },
    typeB: {
      fontSize: { base: "sm", sm: "md" },
      color: "lightGray"
    },
  }

  return (
    <VStack align={"stretch"} spacing={3}>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text {...textTypes.typeA}>Discount:</Text>
          <Text {...textTypes.typeB}>{appDeveloment ? "Ruleset, offer code" : ""}</Text>
        </HStack>
        <Box>$ 10.00</Box>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text {...textTypes.typeA}>Shipping:</Text>
          <Text {...textTypes.typeB}>{appDeveloment ? "Express shipping" : ""}</Text>
        </HStack>
        <Box>
          <Text>$ {order?.shippingPrice}</Text>
        </Box>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text fontSize={{ base: "sm", sm: "md" }} fontWeight={"extrabold"}>Order Tax</Text>
        </HStack>
        <Box>$ 0</Box>
      </HStack>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <Text fontSize={{ base: "sm", sm: "2xl" }} fontWeight={"extrabold"}>Total Cost</Text>
        </HStack>
        <Box><Text fontSize={{ base: "sm", sm: "2xl" }} fontWeight={"extrabold"}>$ 10.00</Text></Box>
      </HStack>
    </VStack>
  )
}

export default OrderDetailCost