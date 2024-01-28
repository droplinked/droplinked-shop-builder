import { Flex } from '@chakra-ui/layout'
import AppCard from 'components/common/card/AppCard'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { IAuthSupportedWalletsService } from 'lib/apis/auth/interfaces'
import { authSupportedWalletsService } from 'lib/apis/auth/services'
import React, { useContext, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import technicalContext from '../../context'
import ChainAccordion from './parts/accordion/ChainAccordion'
import LoginMethodsLoading from './parts/loading/LoginMethodsLoading'

function SupportedLoginMethods() {
    const { updateState } = useContext(technicalContext)
    const { isLoading, error, data } = useQuery({
        queryKey: "supported-login-methods",
        queryFn: authSupportedWalletsService,
        refetchOnWindowFocus: false
    })

    const response = useMemo(() => data?.data, [data])
    useEffect(() => {
        const selectedLoginMethods = response?.reduce((chains: IAuthSupportedWalletsService[], currentChain) => {
            const activatedWallets = currentChain.wallets.filter(wallet => wallet.isActivated)
            if (activatedWallets.length > 0) chains.push({ ...currentChain, wallets: activatedWallets })
            return chains
        }, [])
        updateState("loginMethods", selectedLoginMethods)
    }, [response])

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