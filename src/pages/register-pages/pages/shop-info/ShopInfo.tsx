import { Flex, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import { useProfile } from "functions/hooks/useProfile/useProfile"
import { getShopAddressBookService } from 'lib/apis/address/addressServices'
import React, { useEffect, useState, useTransition } from 'react'
import { useMutation, useQuery } from 'react-query'
import ShopInfoAddress from './parts/address/shopInfoAddress'
import ShopAPIKey from './parts/api-key/ShopAPIKey'
import PostPurchaseDataGatheringInput from './parts/post-purchase-data-gathering/PostPurchaseDataGatheringInput'
import PrivateKey from './parts/private-key/PrivateKey'
import StoreInformation from './parts/store-information/StoreInformation'
import ShopInfoSubmit from './parts/submit/ShopInfoSubmit'
import ReferralCode from './parts/referral/ReferralCode'
import { getReferralReportService } from 'lib/apis/shop/shopServices'
import ReferralCommunity from './parts/referral-community/ReferralCommunity'

export interface IstatesShopInfo {
  description: string
  addressBookID: string
  tags?: Array<string>
  pre_purchase_data_fetch: {
    active: boolean,
    title: string
  } | null;
  referralDetails: {
    code: string;
    customCode: string;
    percent: number;
    count: number;
    income: number
  } | null
}

export interface IShopInfoChildProps{
  States: IstatesShopInfo;
  updateStates: (key: string, value: any) => void;
}

function RegisterShopInfo() {
  const { shop } = useProfile()
  const addressService = useMutation(() => getShopAddressBookService())
  const { data: referralReports, isLoading: referralReportsLoading } = useQuery({queryKey: 'referral_report', queryFn: getReferralReportService, cacheTime: 1, refetchOnWindowFocus: false});
  const [States, setStates] = useState<IstatesShopInfo>({ description: null, addressBookID: null, tags: [], pre_purchase_data_fetch: null, referralDetails: null })
  const [pending, start_transition] = useTransition()
  const updateStates = (key: string, value: string) => start_transition(() => setStates((prev: IstatesShopInfo) => ({ ...prev, [key]: value })))
  
  const address = addressService.data?.data?.data

  useEffect(() => {addressService.mutate()}, [])
  useEffect(() => {updateStates("addressBookID", address && address.length ? address[0]._id : null)}, [addressService.data])
  useEffect(() => {
    if (shop?.description) updateStates("description", shop.description)
    if (shop?.tags) updateStates("tags", shop.tags)
    if (shop?.pre_purchase_data_fetch) updateStates("pre_purchase_data_fetch", shop.pre_purchase_data_fetch)
    if (shop?.referralDetails) updateStates("referralDetails", shop.referralDetails)
  }, [shop])

  return (
    <VStack width={"100%"} spacing={4} justifyContent="center" align={"stretch"}>
      <AppCard><StoreInformation States={States} updateStates={updateStates} /></AppCard>
      <AppCard><ShopInfoAddress addressService={addressService} /></AppCard>
      <AppCard><ShopAPIKey /></AppCard>
      <AppCard><PrivateKey /></AppCard>
      <AppCard><PostPurchaseDataGatheringInput States={States} updateStates={updateStates} /></AppCard>
      { States?.referralDetails && <AppCard><ReferralCode States={States} updateStates={updateStates}/></AppCard>}
      {!referralReportsLoading && referralReports.data.data.length && <AppCard><ReferralCommunity referralReports={referralReports.data.data}/></AppCard>}
      <Flex justifyContent={"right"}><ShopInfoSubmit States={States} updateStates={updateStates} /></Flex>
    </VStack>
  )
}

export default RegisterShopInfo