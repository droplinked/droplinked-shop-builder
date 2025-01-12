import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import Button from 'components/redesign/button/Button'
import useAppStore from 'lib/stores/app/appStore'
import React from 'react'
import { Link } from 'react-router-dom'
import CircleManage from './CircleManage'

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
                    <Button variant="outline" border={"none"} color="#179ef8" size="sm" sx={{ path: { stroke: "#179ef8" } }}>
                        <AppIcons.Refresh />
                        Recharge
                    </Button>
                </Link>
                <CircleManage {...{ isOpen, onClose, onOpen }} />
            </Flex>
        )
    )
}
