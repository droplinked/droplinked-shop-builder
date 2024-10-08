import useAppStore from 'lib/stores/app/appStore'
import Select from 'pages/invoice-management/components/Select'
import React from 'react'

interface Props {
    onWalletChange: (wallet: string) => void
    selectedChain: string
}

function WalletSelect({ onWalletChange, selectedChain }: Props) {
    const { shop, user: { wallets: connectedWallets } } = useAppStore()
    const targetCircleWallet = shop.circleWallets?.find((wallet) => wallet.chain === selectedChain)
    const manuallyConnectedWalletOnSelectedChain = connectedWallets.find((wallet) => wallet.type === selectedChain)
    const wallets = [targetCircleWallet, manuallyConnectedWalletOnSelectedChain]
        .filter(Boolean)
        .map((wallet) => ({ walletAddress: wallet.address, circleChain: wallet.circleChain }))

    return (
        <Select
            items={wallets}
            labelAccessor='walletAddress'
            selectProps={{
                width: "100%",
                borderColor: "#292929",
                bgColor: "#1C1C1C",
                color: "white",
                placeholder: "Wallet",
                onChange: (e) => {
                    onWalletChange(Boolean(e.target.value) ? JSON.parse(e.target.value) : "")
                }
            }}
        />
    )
}

export default WalletSelect