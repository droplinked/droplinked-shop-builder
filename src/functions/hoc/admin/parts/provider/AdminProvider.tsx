import useHookStore from 'functions/hooks/store/useHookStore'
import { IshopInfoService } from 'lib/apis/shop/interfaces'
import { shopInfoService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'

function AdminProvider({ children }) {
  const { data: { collection }, app: { shop, updateState, user } } = useHookStore()
  const { mutateAsync } = useMutation((params: IshopInfoService) => shopInfoService(params))

  const updateCredit = async () => {
    if (!shop?.name || !user?._id) return false
    try {
      const { data } = await mutateAsync({ shopName: shop?.name })
      const credit = data?.data?.credit
      if (shop?.credit !== credit) updateState({ key: 'shop', params: { ...shop, credit } })
    } catch (error) { }
  }

  // Update credit shop
  useEffect(() => {
    const time = setInterval(async () => {
      try {
        updateCredit()
      } catch (error) { }
    }, 3 * 60 * 1000)

    return () => {
      clearInterval(time)
    }
  }, [shop, user])

  // Initial data state managment
  useEffect(() => {
    if (!collection.loaded) collection.fetch()
  }, [collection])

  return children
}

export default AdminProvider