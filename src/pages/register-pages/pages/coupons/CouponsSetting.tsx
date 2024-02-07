import { Flex } from '@chakra-ui/react'
import { useProfile } from 'functions/hooks/useProfile/useProfile'
import { giftcardsService } from 'lib/apis/coupons/addressServices'
import { IgiftcardsService } from 'lib/apis/coupons/interfaces'
import { IshopService } from 'lib/apis/shop/interfaces'
import { shopService } from 'lib/apis/shop/shopServices'
import React, { useCallback, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import CouponsSettingContext from './context'
import CouponsEmpty from './parts/empty/CouponsEmpty'
import CouponsList from './parts/list/CouponsList'
import CouponsLoading from './parts/loading/CouponsLoading'

function CouponsSetting() {
  const { mutate, data, isLoading } = useMutation((params: IgiftcardsService) => giftcardsService(params))
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { updateShopData } = useProfile()

  const fetch = useCallback(() => mutate({ page: searchParams.get('page') || '1', search: searchParams.get('search') || null }), [searchParams])

  const updateFilters = useCallback((key: string, value: string) => {
    if (!value.length || searchParams.get(key) === value) {
      searchParams.delete(key)
    } else {
      searchParams.set(key, value)
      if (searchParams.get("page")) searchParams.set("page", "1")
    }
    navigate(`${location.pathname}?${searchParams.toString()}`)
  }, [searchParams, location])

  useEffect(() => { updateShopData() }, [])

  useEffect(() => fetch(), [searchParams])

  return (
    <CouponsSettingContext.Provider value={{
      coupons: data?.data?.data,
      fetch,
      updateFilters
    }}>
      {isLoading ? <CouponsLoading /> : data?.data?.data && data?.data?.data.data.length ? <CouponsList /> : <CouponsEmpty />}
    </CouponsSettingContext.Provider>
  )
}

export default CouponsSetting