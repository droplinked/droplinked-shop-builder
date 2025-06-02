import { CopyMd } from 'assets/icons/Action/Copy/CopyMd'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

const WALLET_ADDRESS = "0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245"

function WalletSection() {
    const { showToast } = useAppToast()

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(WALLET_ADDRESS)
        showToast({
            type: "success",
            message: "The wallet address has been copied to your clipboard."
        })
    }

    const CopyButton = () => (
        <button onClick={handleCopyAddress}>
            <CopyMd color='#FFF' />
        </button>
    )

    return (
        <SectionContainer title="Crossmint Wallet">
            <SectionContent
                title="Wallet Address"
                description="The crossmint wallet offers a secure and seamless experience."
                rightContent={
                    <AppInput
                        rightElement={<CopyButton />}
                        inputProps={{
                            placeholder: "Wallet Address",
                            value: WALLET_ADDRESS,
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