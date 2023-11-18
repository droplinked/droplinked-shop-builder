import { Box, SimpleGrid, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import { useCustomNavigate } from 'functions/hooks/useCustomeNavigate/useCustomNavigate'
import { IshopPublicRecordedService } from 'lib/apis/shop/interfaces'
import { shopPublicRecordedService } from 'lib/apis/shop/shopServices'
import ShopsListSkeleton from './parts/skeleton/ShopsListSkeleton'
import ShopsContainer from './parts/container/ShopsContainer'
import AffiliateStoresFilters from './parts/filter/AffiliateStoresFilters'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'

function Shops() {
  const { mutate, data, isLoading } = useMutation((params: IshopPublicRecordedService) => shopPublicRecordedService(params))
  const [searchParams] = useSearchParams()
  const { shopNavigate } = useCustomNavigate()
  const stores = useMemo(() => data?.data?.data, [data])

  const fetch = useCallback(() => {
    mutate({
      page: searchParams.get('page') || 1,
      tags: searchParams.get('search') || null,
    })
  }, [searchParams])

  useEffect(() => fetch(), [searchParams])

  const addQuery = useCallback((key, value) => {
    const filter = searchParams
    filter.set("page", '1')
    if (filter.get(key) === value || !value.length) {
      filter.delete(key)
    } else {
      filter.set(key, value)
    }
    shopNavigate(`affiliate/stores?${filter.toString()}`)
  }, [searchParams])


  return (
    <AppCard>
      <VStack align={"stretch"} spacing={7}>
        <Box><AffiliateStoresFilters addQuery={addQuery} /></Box>
        {isLoading ? <ShopsListSkeleton /> : stores && stores?.data.length ? (
          <VStack align={"stretch"} spacing="20px">
            {stores && stores.data.map((el: any, key: number) => <ShopsContainer shop={el} key={key} />)}
            <Pagination current={stores?.currentPage} lastPage={stores?.totalPages ? parseInt(stores?.totalPages) : 1} nextPage={stores?.hasNextPage || false} prevPage={stores?.hasPreviousPage || false} />
          </VStack>
        ) : <AppEmptyPage title='No result' />}
      </VStack>
    </AppCard>
  )
}

export default Shops