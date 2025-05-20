import { Button } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppInput from 'components/redesign/input/AppInput'
import useAppStore from 'stores/app/appStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function WalletInput() {
    const { shop } = useAppStore()
    const { circleWallets } = shop;
    const circleWalletAddress = circleWallets?.find(cw => cw?.chain === "ETH")?.address || ""
    const navigate = useNavigate();

    return (
        circleWallets?.length ?
            <AppInput
                inputProps={{ value: circleWalletAddress, isReadOnly: true }}
                rightElement={
                    <ClipboardText text={circleWalletAddress} />
                }
            />
            :
            <Button width={"100%"} onClick={() => navigate("/analytics/registration")}>Activate Merchant Wallet</Button>
    )
}
