import React, { useState, useMemo } from 'react'
import { Flex, useMediaQuery } from '@chakra-ui/react';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import Input from 'components/redesign/input/Input';
import AppIcons from 'assest/icon/Appicons';
import useAppStore from 'lib/stores/app/appStore';

export default function Filters() {
    const [searchValue, setSearchValue] = useState("")
    const [recordFilter, setRecordFilter] = useState(null)
    const [walletFilter, setWalletFilter] = useState(null)
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")
    const { shop: { paymentWallets } } = useAppStore()

    const recordItems = [
        {
            label: "All Records",
            value: null
        },
        {
            label: "Droplinked Records",
            value: "DROPLINKED_RECORDS"
        }
    ]

    const walletsItems = useMemo(() => {
        const baseItems = [{
            label: "All Wallets",
            value: null,
        }]

        const walletOptions = paymentWallets.flatMap((wallet) =>
            wallet.destinationAddress.map((address, index) => ({
                label: `${wallet.type} Wallet ${index + 1}`,
                labelDescription: `${address.destinationAddress.slice(0, isSmallerThan768 ? 20 : 6)}...`,
                value: `${wallet._id}_${index}`,
            }))
        );

        return [...baseItems, ...walletOptions]
    }, [paymentWallets, isSmallerThan768])

    return (
        <Flex justifyContent="space-between" alignItems="center" gap={4}>
            <Input
                leftElement={
                    <AppIcons.Search
                        width={"20px"}
                        height={"20px"}
                    />
                }
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
                    onChange={(value: string) => setWalletFilter(value)}
                    placeholder='Wallets'
                    value={walletFilter}
                    mobileModeIcon={<AppIcons.Wallet width={"20px"} height={"20px"} />}
                />
                <SelectMenu
                    items={recordItems}
                    onChange={(value: string) => setRecordFilter(value)}
                    placeholder='Records'
                    value={recordFilter}
                    mobileModeIcon={<AppIcons.NFTIcon />}
                />
            </Flex>
        </Flex>
    )
}
