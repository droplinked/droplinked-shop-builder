import { Flex, useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import Input from 'components/redesign/input/Input';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import useAppStore from 'lib/stores/app/appStore';
import React, { useMemo } from 'react';
import { useOnchainRecords } from '../context/OnchainRecordsContext';

export default function Filters() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { user: { wallets } } = useAppStore()
    const {
        searchValue,
        setSearchValue,
        recordFilter,
        setRecordFilter,
        walletFilter,
        setWalletFilter
    } = useOnchainRecords();

    const recordItems = [
        { label: "All Records", value: null },
        { label: "Droplinked Records", value: true }
    ]

    const walletsItems = useMemo(() => {
        const baseItems = [{ label: "All Wallets", value: null }]

        const walletOptions = wallets?.map(({ address, type }) => ({
            label: type,
            labelDescription: `${address.slice(0, isSmallerThan768 ? 20 : 6)}...`,
            value: type
        }))

        return [...baseItems, ...(walletOptions ?? [])]
    }, [wallets, isSmallerThan768])

    return (
        <Flex justifyContent="space-between" alignItems="center" gap={4}>
            <Input
                leftElement={<AppIcons.Search width="20px" height="20px" />}
                inputProps={{
                    placeholder: "Search",
                    value: searchValue,
                    onChange: (e) => setSearchValue(e.target.value),
                }}
                inputGroupProps={{
                    width: { base: "100%", md: "300px" }
                }}
            />
            <Flex gap={4} alignItems="center">
                <SelectMenu
                    items={walletsItems}
                    onChange={setWalletFilter}
                    placeholder='Wallets'
                    value={walletFilter}
                    mobileModeIcon={<AppIcons.Wallet width={"20px"} height={"20px"} />}
                />
                <SelectMenu
                    items={recordItems}
                    onChange={setRecordFilter}
                    placeholder='Records'
                    value={recordFilter}
                    mobileModeIcon={<AppIcons.NFTIcon />}
                />
            </Flex>
        </Flex>
    )
}
