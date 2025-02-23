import { useQuery } from 'react-query';
import { getOnchainInventory } from 'lib/apis/onchain-inventory/services';
import useAppStore from 'lib/stores/app/appStore';
import useDebounce from 'functions/hooks/debounce/useDebounce';
import useOnchainRecordsStore from '../store/useOnchainRecordsStore';

export const useOnchainRecords = () => {
    const { searchValue, recordFilter, walletFilter } = useOnchainRecordsStore();
    const debouncedSearch = useDebounce(searchValue, 1000);
    const { user: { wallets } } = useAppStore();

    const selectedWallet = wallets?.find((wallet) => wallet.type === walletFilter);

    const { isFetching, data, refetch, isError } = useQuery({
        queryKey: ["records", debouncedSearch, recordFilter, selectedWallet],
        queryFn: () => getOnchainInventory({
            search: searchValue ?? undefined,
            chain: selectedWallet?.type,
            wallet: selectedWallet?.address,
            myProducts: recordFilter ?? undefined
        }),
    });

    return {
        isFetching,
        data,
        refetch,
        isError,
        selectedWallet
    };
};
