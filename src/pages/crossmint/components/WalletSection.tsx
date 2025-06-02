import AppInput from 'components/redesign/input/AppInput'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'

function WalletSection() {
    return (
        <SectionContainer title="Crossmint Wallet">
            <SectionContent
                title="Wallet Address"
                description="The crossmint wallet offers a secure and seamless experience."
                rightContent={
                    <AppInput
                        inputProps={{
                            placeholder: "Wallet Address",
                            value: "0xe29E7479c23Db494aAa0D36C93844B2d79f50c2245",
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