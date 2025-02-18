import { Flex } from '@chakra-ui/react';
import React from 'react';
import EmptyView from '../components/EmptyView';
import RecordsList from '../components/records-list/RecordsList';
import Filters from './Filters';
import { useOnchainRecords } from '../context/OnchainRecordsContext';
import FakeRecordsList from '../components/records-skeleton/RecordsSkeleton';

export default function Records() {
    const { isFetching, data, isError } = useOnchainRecords();
    const { droplinkedNFTs, walletNFTs } = data?.data ?? {};
    const hasNFT = (droplinkedNFTs?.length !== 0 || walletNFTs?.length !== 0);

    return (
        <Flex flexDirection={"column"} gap={{ base: 4, md: 6 }} width={"100%"}>
            <Filters />
            {(hasNFT && !isFetching && !isError) && <RecordsList droplinkedNFTs={droplinkedNFTs} walletNFTs={walletNFTs} />}
            {(isFetching) && <FakeRecordsList />}
            {(!hasNFT && !isFetching) && <EmptyView />}
        </Flex>
    );
}
