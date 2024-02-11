import { Flex } from '@chakra-ui/layout'
import AppCard from 'components/common/card/AppCard'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { authSupportedWalletsService } from 'lib/apis/auth/services'
import { getShopInformationService } from 'lib/apis/shop/shopServices'
import React, { useContext, useMemo } from 'react'
import { useQuery } from 'react-query'
import technicalContext from '../../context'
import ChainAccordion from './parts/accordion/ChainAccordion'
import LoginMethodsLoading from './parts/loading/LoginMethodsLoading'

function SupportedLoginMethods() {
    const { updateState } = useContext(technicalContext)
    const supportedLoginMethods = useQuery("supported-login-methods", authSupportedWalletsService, { refetchOnWindowFocus: false })
    const selectedLoginMethods = useQuery("selected-login-methods", getShopInformationService, {
        refetchOnWindowFocus: false,
        enabled: supportedLoginMethods.isSuccess,
        onSuccess: (data) => {
            let selectedLoginMethods = data.data.data.loginMethods.filter(chain => chain.wallets.length > 0)
            if (!Array.isArray(selectedLoginMethods) || selectedLoginMethods.length === 0) {
                const [{ name, wallets: [firstWallet] }] = supportedLoginMethods.data.data.data
                selectedLoginMethods = [{ name, wallets: [{ ...firstWallet, isActivated: true }] }]
            }
            updateState("loginMethods", selectedLoginMethods)
        }
    })
    const response = useMemo(() => supportedLoginMethods.data?.data?.data, [supportedLoginMethods.data])
    const isLoading = supportedLoginMethods.isLoading || selectedLoginMethods.isLoading

    return (
        <AppCard>
            <Flex direction={"column"} gap={"24px"}>
                <Flex direction={"column"} gap={"8px"}>
                    <FieldLabel label='User Login Methods' textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired />
                    <AppTypography fontSize="14px" color="#C2C2C2">Allow or deny login option for each wallet</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={"8px"}>
                    {isLoading ?
                        <LoginMethodsLoading /> :
                        response.map((chain, index) =>
                            <ChainAccordion
                                key={index}
                                chain={chain}
                            />
                        )}
                </Flex>
            </Flex>
        </AppCard>
    )
}

export default SupportedLoginMethods