import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import { IPaymentPublicService } from 'lib/apis/shop/interfaces'
import React from 'react'
import TokensIcon from './TokensIcon'

interface Props {
    token: IPaymentPublicService
    onChange: Function
}

export default function TokenCard({ token, onChange }: Props) {

    return (
        <Flex flexDir={"column"} width={"100%"} border={"1px solid #292929"} borderRadius={"8px"}>
            <Flex width={"100%"} justifyContent={"space-between"} p={6} borderBottom={"1px solid #292929"}>
                <AppTypography fontSize={"16px"} fontWeight={500} color={"#fff"}>{token.name}</AppTypography>
                <SwitchBox isChecked onToggle={(e) => console.log(e.target.value)} />
            </Flex>
            <Flex gap={2} px={6} py={4} alignItems={"center"} justifyContent={"space-between"}>
                <Flex flexDir={"column"}>
                    <AppTypography color={"#7b7b7b"} fontSize={"12px"}>Networks</AppTypography>
                    <Flex gap={2} alignItems={"center"}>
                        {
                            token.supportedChains.map((chain, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <AppTypography color={"#fff"} fontSize={"12px"}>{chain.type}</AppTypography>
                                        {index !== token.supportedChains.length - 1 && <AppIcons.DotSpacer />}
                                    </React.Fragment>
                                )
                            })
                        }
                    </Flex>
                </Flex>
                <TokensIcon chains={token.supportedChains} />
            </Flex>
        </Flex>
    )
}
