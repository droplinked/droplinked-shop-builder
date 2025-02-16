import { Button } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import Input from 'components/redesign/input/Input'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function WalletInput() {
    const { shop } = useAppStore()
    const { circleWallets } = shop;
    const circleWalletAddress = circleWallets?.find(cw => cw?.chain === "ETH")?.address || ""
    const navigate = useNavigate();

    return (
        circleWallets?.length ?
            <Input
                inputProps={{ value: circleWalletAddress, isReadOnly: true }}
                rightElement={
                    <ClipboardText text={circleWalletAddress} />
                }
            />
            :
            <Button width={"100%"} onClick={() => navigate("/analytics/registration")}>Activate Merchant Wallet</Button>
    )
}
