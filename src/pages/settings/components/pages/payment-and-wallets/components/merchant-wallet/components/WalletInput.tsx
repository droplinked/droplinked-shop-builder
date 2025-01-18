import { Button } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Input from 'components/redesign/input/Input'
import useAppToast from 'functions/hooks/toast/useToast'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function WalletInput() {
    const { shop } = useAppStore()
    const { showToast } = useAppToast()
    const { circleWallets } = shop;
    const circleWalletAddress = circleWallets?.find(cw => cw?.chain === "ETH")?.address || ""
    const navigate = useNavigate();
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(circleWalletAddress);
        showToast({ message: "Address copied to clipboard", type: "success" })
    }

    return (
        circleWallets?.length ?
            <Input
                inputProps={{ value: circleWalletAddress, isReadOnly: true }}
                rightElement={
                    <AppIcons.Copy style={{ cursor: "pointer" }} onClick={handleCopyAddress} />
                }
            />
            :
            <Button width={"100%"} onClick={() => navigate("/analytics/registration")}>Activate Merchant Wallet</Button>
    )
}
