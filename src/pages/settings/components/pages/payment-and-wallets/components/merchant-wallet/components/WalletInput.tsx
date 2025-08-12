import { Button } from '@chakra-ui/react'
import ClipboardText from 'components/common/clipboardText/ClipboardText'
import AppInput from 'components/redesign/input/AppInput'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'

export default function WalletInput() {
    const navigate = useNavigate()
    const { t } = useLocaleResources('settings')
    const { shop: { circleWallets } } = useAppStore()

    const circleWalletAddress = circleWallets?.find(cw => cw?.chain === "ETH")?.address || ""

    return (
        circleWallets?.length ?
            <AppInput
                inputProps={{ value: circleWalletAddress, isReadOnly: true }}
                rightElement={<ClipboardText text={circleWalletAddress} />}
            />
            :
            <Button
                width="100%"
                onClick={() => navigate("/analytics/registration")}
            >
                {t("MerchantWallet.activateButton")}
            </Button>
    )
}
