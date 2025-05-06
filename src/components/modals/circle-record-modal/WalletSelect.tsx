import useAppStore from 'lib/stores/app/appStore'
import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'

interface Props {
    onWalletChange: (wallet: string) => void
    selectedChain: string
}

function WalletSelect({ onWalletChange, selectedChain }: Props) {
    const { shop, user: { wallets: userWallets } } = useAppStore()

    // Find the wallet corresponding to the selected chain in shop's circle wallets
    const shopCircleWalletForChain = shop.circleWallets?.find((wallet) => wallet.chain === selectedChain)

    // Find the wallet manually connected by the user for the selected chain
    const userWalletForChain = userWallets?.find((wallet) => wallet.type === selectedChain)

    // Combine the wallets found in both shop circle wallets and user wallets
    const availableWallets = [shopCircleWalletForChain, userWalletForChain]
        .filter(Boolean)
        .map((wallet) => ({ walletAddress: wallet.address, circleChain: wallet.circleChain }))

    return (
        <AppSelect
            items={availableWallets}
            labelAccessor='walletAddress'
            selectProps={{
                width: "100%",
                borderColor: "neutral.gray.800",
                bgColor: "#1C1C1C",
                placeholder: "Select Wallet",
                onChange: (e) => {
                    const selectedWallet = Boolean(e.target.value) ? JSON.parse(e.target.value) : ""
                    onWalletChange(selectedWallet)
                }
            }}
        />
    )
}

export default WalletSelect