import { Flex, useDisclosure } from '@chakra-ui/react'
import { Refresh1Sm } from 'assets/icons/Action/Refresh1/Refresh1Sm'
import { ConfigureSm } from 'assets/icons/System/Configure/ConfigureSm'
import AppButton from 'components/redesign/button/AppButton'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { Link } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import CircleManage from './CircleManage'

export default function ManageRechargeButtons() {
    const disclosure = useDisclosure()
    const { t } = useLocaleResources('settings')
    const { shop: { circleWallets } } = useAppStore()

    return (
        circleWallets?.length && (
            <Flex alignItems="center" gap="2">
                <AppButton
                    variant="outlined"
                    size="sm"
                    border="none"
                    color="white"
                    leftIcon={<ConfigureSm />}
                    onClick={disclosure.onOpen}
                >
                    {t("MerchantWallet.buttons.manage")}
                </AppButton>

                <Link to={"https://www.binance.com/en/crypto/buy"} target='_blank'>
                    <BlueButton fontSize={12} fontWeight={500}>
                        <Refresh1Sm color='"#179ef8"' />
                        {t("MerchantWallet.buttons.recharge")}
                    </BlueButton>
                </Link>
                <CircleManage {...disclosure} />
            </Flex>
        )
    )
}
