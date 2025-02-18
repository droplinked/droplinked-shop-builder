import { Flex, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import BlueButton from 'components/redesign/button/BlueButton'
import React from 'react'
import ConnectWalletModal from './ConnectWalletModal'

export default function EmptyView() {
    const { onClose, onOpen, isOpen } = useDisclosure();

    return (
        <Flex justify="center" align="center" flexDirection="column" height={"60dvh"} gap="64px">
            <AppImage width="328px" height="200px" src="https://upload-file-droplinked.s3.amazonaws.com/e3238488d0379947e2e925d7c86f96274bb325c2d0d3f2f3408c2504398019b2.png" alt="Empty" />
            <Flex flexDirection={"column"} gap={4}>
                <AppTypography color={"#fff"} fontSize={16} fontWeight={400}>
                    Get started by adding your first product
                </AppTypography>
                <BlueButton
                    sx={{ path: { stroke: "#2BCFA1" } }}
                    leftIcon={<AppIcons.Wallet width={"16px"} height={"16px"} />}
                    iconSpacing={"4px"}
                    color={"#2BCFA1"}
                    fontSize={12}
                    fontWeight={500}
                    onClick={onOpen}
                >
                    Connect Wallet
                </BlueButton>
            </Flex>
            <ConnectWalletModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    )
}
