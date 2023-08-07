import { Flex } from '@chakra-ui/react'
import { giftcardsService } from 'lib/apis/coupons/addressServices'
import { IgiftcardsService } from 'lib/apis/coupons/interfaces'
import React, { useCallback, useEffect } from 'react'
import { useMutation } from 'react-query'
import CouponsSettingContext from './context'
import CouponsEmpty from './parts/empty/CouponsEmpty'
import CouponsList from './parts/list/CouponsList'
import CouponsLoading from './parts/loading/CouponsLoading'

function CouponsSetting() {
  const { mutate, data, isLoading } = useMutation((params: IgiftcardsService) => giftcardsService(params))

  const fetch = useCallback(() => mutate({ page: '1' }), [])

  useEffect(() => {
    fetch()
  }, [])

  return (
    <CouponsSettingContext.Provider value={{
      coupons: data?.data?.data,
      fetch
    }}>
      {isLoading ? <CouponsLoading /> : data?.data?.data && data?.data?.data.totalDocuments.length ? <CouponsList /> : <CouponsEmpty />}
    </CouponsSettingContext.Provider>
  )
}

export default CouponsSetting