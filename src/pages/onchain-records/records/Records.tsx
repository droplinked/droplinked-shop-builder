import { Flex } from '@chakra-ui/react'
import React from 'react'
import EmptyView from '../components/EmptyView'
import RecordsList from '../components/records-list/RecordsList'
import Filters from './Filters'
import { useOnchainRecords } from '../context/OnchainRecordsContext'
import RecordsSkeleton from '../components/RecordsSkeleton'

export default function Records() {
    const { isFetching, data, isError, searchValue, walletFilter, recordFilter } = useOnchainRecords()
    const { droplinkedNFTs, walletNFTs } = data?.data ?? {}
    const hasNFT = (droplinkedNFTs?.length !== 0 || walletNFTs?.length !== 0)
    const hasFilters = (searchValue || walletFilter?.length || recordFilter?.length)

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} width="100%">
            {(hasNFT || isFetching || hasFilters) && <Filters />}
            {(isFetching) && <RecordsSkeleton />}
            {(hasNFT && !isFetching && !isError) && <RecordsList droplinkedNFTs={droplinkedNFTs} walletNFTs={walletNFTs} />}
            {(!hasNFT && !isFetching) && <EmptyView />}
        </Flex>
    )
}