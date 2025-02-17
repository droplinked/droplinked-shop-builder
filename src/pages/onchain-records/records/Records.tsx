import { Flex } from '@chakra-ui/react';
import React, { useState, useMemo } from 'react';
import EmptyView from '../components/EmptyView';
import RecordsList from '../components/records-list/RecordsList';
import Filters from './Filters';
import { useQuery } from 'react-query';
import { getOnchainInventory } from 'lib/apis/onchain-inventory/services';
import useAppStore from 'lib/stores/app/appStore';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import FakeRecordsList from '../components/records-skeleton/RecordsSkeleton';
import { OnchainRefetchProvider } from '../context/OnchainRefetchContext';

export default function Records() {
    const [searchValue, setSearchValue] = useState(null)
    const [recordFilter, setRecordFilter] = useState(null)
    const [walletFilter, setWalletFilter] = useState(null)
    const debouncedSearch = useDebounce(searchValue, 1000)
    const { user: { wallets } } = useAppStore()

    const selectedWallet = useMemo(() => {
        if (!walletFilter) return null;
        return wallets.find((wallet) => wallet.address === walletFilter)
    }, [walletFilter, wallets]);

    const { isFetching, data, refetch, isError } = useQuery({
        queryKey: ["records", debouncedSearch, recordFilter, selectedWallet],
        queryFn: () => getOnchainInventory({
            search: searchValue ?? undefined,
            chain: selectedWallet?.type,
            wallet: selectedWallet?.address,
            myProducts: recordFilter ?? undefined
        }),
    });

    const { droplinkedNFTs, walletNFTs } = data?.data ?? {};
    const hasNFT = (droplinkedNFTs?.length !== 0 || walletNFTs?.length !== 0);

    return (
        <OnchainRefetchProvider refetch={refetch}>
            <Flex flexDirection={"column"} gap={{ base: 4, md: 6 }} width={"100%"}>
                <Filters
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    recordFilter={recordFilter}
                    setRecordFilter={setRecordFilter}
                    walletFilter={walletFilter}
                    setWalletFilter={setWalletFilter}
                />
                {(hasNFT && !isFetching && !isError) && <RecordsList droplinkedNFTs={droplinkedNFTs} walletNFTs={walletNFTs} />}
                {(isFetching) && <FakeRecordsList />}
                {(!hasNFT && !isFetching) && <EmptyView />}
            </Flex>
        </OnchainRefetchProvider>

    );
}
