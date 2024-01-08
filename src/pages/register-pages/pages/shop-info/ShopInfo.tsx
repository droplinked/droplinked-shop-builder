import { Box, Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppInput from 'components/common/form/textbox/AppInput'
import AppTypography from 'components/common/typography/AppTypography'
import { addressBookService } from 'lib/apis/address/addressServices'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import ShopInfoAddress from './parts/address/shopInfoAddress'
import ShopInfoSubmit from './parts/submit/ShopInfoSubmit'
import { useProfile } from "functions/hooks/useProfile/useProfile"
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import ShopTag from './parts/tag/ShopTag'
import ShopAPIKey from './parts/api-key/ShopAPIKey'

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
  const userStore = useMemo(() => 'https://droplinked.io/' + shop.name, [shop])

  const updateStates = useCallback((key: string, value: string) => setStates((prev: IstatesShopInfo) => ({ ...prev, [key]: value })), [])

  // Fetch address user
  useEffect(() => addressService.mutate(), [])

  // Get addressBookID
  useEffect(() => updateStates("addressBookID", address && address.length ? address[0]._id : null), [addressService.data])

  // Update store name as shop
  useEffect(() => {
    if (shop.description) updateStates("description", shop.description)
    if (shop?.tags) updateStates("tags", shop.tags)
  }, [shop])

  return (
    <VStack width={"100%"} spacing={4} justifyContent="center" align={"stretch"}>
      <AppCard>
        <VStack align={"stretch"} color="#FFF" spacing={7}>
          <VStack align={"stretch"}>
            <Box><AppTypography fontSize='18px' fontWeight='bold'>Store URL</AppTypography></Box>
            <Flex justifyContent={"space-between"}>
              <AppTypography fontSize='16px' color={"#C2C2C2"}>{userStore}</AppTypography>
              <ClipboardText text={userStore} />
            </Flex>
          </VStack>
          <VStack align={"stretch"}>
            <FieldLabel label='Store Name' isRequired />
            <Box>
              <AppInput name='name' maxLength={20} value={States.description} onChange={(e: any) => updateStates("description", e.target.value)} placeholder='e.g., droplinked' isRequired />
            </Box>
            <AppTypography fontSize='14px' color={"rgb(128, 128, 128)"}>Enter your store name.(max 20 characters)</AppTypography>
          </VStack>
        </VStack>
      </AppCard>
      <AppCard><ShopInfoAddress addressService={addressService} /></AppCard>
      <AppCard><ShopTag updateStates={updateStates} value={States.tags} /></AppCard>
      <AppCard><ShopAPIKey /></AppCard>
      <Flex justifyContent={"right"}><ShopInfoSubmit States={States} /></Flex>
    </VStack>
  )
}

export default RegisterShopInfo