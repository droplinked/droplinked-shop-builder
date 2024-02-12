import { Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import { useProfile } from "functions/hooks/useProfile/useProfile"
import { addressBookService } from 'lib/apis/address/addressServices'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import ShopInfoAddress from './parts/address/shopInfoAddress'
import ShopAPIKey from './parts/api-key/ShopAPIKey'
import StoreInformation from './parts/store-information/StoreInformation'
import ShopInfoSubmit from './parts/submit/ShopInfoSubmit'

export interface IstatesShopInfo {
  description: string
  addressBookID: string
  tags?: Array<string>
}

function RegisterShopInfo() {
  const { shop } = useProfile()
  const addressService = useMutation(() => addressBookService())
  const [States, setStates] = useState<IstatesShopInfo>({
    description: null,
    addressBookID: null,
    tags: []
  })
  const address = addressService.data?.data?.data

  const updateStates = useCallback((key: string, value: string) => setStates((prev: IstatesShopInfo) => ({ ...prev, [key]: value })), [])

  // Fetch address user
  useEffect(() => addressService.mutate(), [])

  // Get addressBookID
  useEffect(() => updateStates("addressBookID", address && address.length ? address[0]._id : null), [addressService.data])

  // Update store name as shop
  useEffect(() => {
    if (shop?.description) updateStates("description", shop.description)
    if (shop?.tags) updateStates("tags", shop.tags)
  }, [shop])

  return (
    <VStack width={"100%"} spacing={4} justifyContent="center" align={"stretch"}>
      <AppCard><StoreInformation States={States} updateStates={updateStates} /></AppCard>
      <AppCard><ShopInfoAddress addressService={addressService} /></AppCard>
      {/* <AppCard><ShopTag updateStates={updateStates} value={States.tags} /></AppCard> */}
      <AppCard><ShopAPIKey /></AppCard>
      <Flex justifyContent={"right"}><ShopInfoSubmit States={States} /></Flex>
    </VStack>
  )
}

export default RegisterShopInfo