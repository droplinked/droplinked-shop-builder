import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

function WalletSection({ crossmintWallet }: { crossmintWallet?: string }) {
    const { showToast } = useAppToast()

    const handleCopyAddress = () => {
        if (!crossmintWallet) return
        navigator.clipboard.writeText(crossmintWallet)
        showToast({
            type: "success",
            message: "The wallet address has been copied to your clipboard."
        })
    }

    const CopyButton = () => (
        <button onClick={handleCopyAddress}>
            <CopyMd />
        </button>
    )

    return (
        <SectionContainer title="Crossmint Wallet">
            <SectionContent
                title="Wallet Address"
                description="Onchain inventory records are stored here by default"
                rightContent={
                    <AppInput
                        rightElement={<CopyButton />}
                        inputProps={{
                            placeholder: "Wallet Address",
                            value: crossmintWallet,
                            name: "walletAddress",
                            isDisabled: true
                        }}
                    />
                }
            />
        </SectionContainer>
    )
}

export default WalletSection 