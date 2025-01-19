import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleManage from './CircleManage'
import BlueButton from 'components/redesign/button/BlueButton'

export default function ManageRechargeButtons() {
    const { shop } = useAppStore()
    const { circleWallets } = shop;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        circleWallets.length && (
            <Flex gap="2">
                <Button onClick={onOpen} variant="outline" border={"none"} color="white" size="sm">
                    <AppIcons.SidebarSetting />
                    Manage
                </Button>
                <Link to={"https://www.binance.com/en/crypto/buy"} target='_blank'>
                    <BlueButton
                        fontSize={16}
                        fontWeight={500}
                        sx={{ path: { stroke: "#179ef8" } }}
                    >
                        <AppIcons.Refresh />
                        Recharge
                    </BlueButton>
                </Link>
                <CircleManage {...{ isOpen, onClose, onOpen }} />
            </Flex>
        )
    )
}
