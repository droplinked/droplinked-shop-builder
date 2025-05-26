import { Flex, useMediaQuery } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppInput from 'components/redesign/input/AppInput';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import useAppStore from 'stores/app/appStore';
import React, { useMemo } from 'react';
import { useOnchainRecords } from '../context/OnchainRecordsContext';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

export default function Filters() {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { t } = useLocaleResources("onchainRecords")
    const { user: { wallets } } = useAppStore()
    const {
        searchValue,
        setSearchValue,
        recordFilter,
        setRecordFilter,
        walletFilter,
        setWalletFilter
    } = useOnchainRecords()

    const recordItems = [
        { label: t("all_records"), value: null },
        { label: t("droplinked_records"), value: true }
    ]

    const walletsItems = useMemo(() => {
        const baseItems = [{ label: t("all_wallets"), value: null }]

        const walletOptions = wallets?.map(({ address, type }) => ({
            label: type,
            labelDescription: `${address.slice(0, isSmallerThan768 ? 20 : 6)}...`,
            value: type
        }))

        return [...baseItems, ...(walletOptions ?? [])]
    }, [wallets, isSmallerThan768])

    return (
        <Flex justifyContent="space-between" alignItems="center" gap={4}>
            <AppInput
                leftElement={<AppIcons.Search width="20px" height="20px" />}
                inputProps={{
                    placeholder: t("search"),
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
                    placeholder={t("wallets")}
                    value={walletFilter}
                    mobileModeIcon={<AppIcons.Wallet width="20px" height="20px" />}
                />
                <SelectMenu
                    items={recordItems}
                    onChange={setRecordFilter}
                    placeholder={t("records")}
                    value={recordFilter}
                    mobileModeIcon={<AppIcons.NFTIcon />}
                />
            </Flex>
        </Flex>
    )
}
