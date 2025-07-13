import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppButton from 'components/redesign/button/AppButton'
import useAppStore from 'stores/app/appStore'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleManage from './CircleManage'
import BlueButton from 'components/redesign/button/BlueButton'
import { ConfigureSm } from 'assets/icons/System/Configure/ConfigureSm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function ManageRechargeButtons() {
    const { t } = useLocaleResources('settings');
    const { shop } = useAppStore()
    const { circleWallets } = shop;
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        circleWallets.length && (
            <Flex gap="2" alignItems={"center"}>
                {/* TODO: Check with design */}
                <AppButton variant="outlined" size="sm" onClick={onOpen} border={"none"} color="white" leftIcon={<ConfigureSm />} >
                    {t("settings.merchantWallet.buttons.manage")}
                </AppButton>
                <Link to={"https://www.binance.com/en/crypto/buy"} target='_blank'>
                    <BlueButton
                        fontSize={12}
                        fontWeight={500}
                        sx={{ path: { stroke: "#179ef8" } }}
                    >
                        <AppIcons.Refresh style={{ width: "16px", height: "16px" }} />
                        {t("settings.merchantWallet.buttons.recharge")}
                    </BlueButton>
                </Link>
                <CircleManage {...{ isOpen, onClose, onOpen }} />
            </Flex>
        )
    )
}
