import { Flex } from '@chakra-ui/layout'
import AppCard from 'components/common/card/AppCard'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { authSupportedService } from 'lib/apis/auth/services'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import ChainAccordion from './parts/accordion/ChainAccordion'
import LoginMethodsLoading from './parts/loading/LoginMethodsLoading'

function SupportedLoginMethods() {
    const { isLoading, error, data } = useQuery({
        queryKey: "supported_chains",
        queryFn: () => authSupportedService()
    })

    const response = useMemo(() => data?.data.data, [data])

    return (
        <AppCard>
            <Flex direction={"column"} gap={"24px"}>
                <Flex direction={"column"} gap={"8px"}>
                    <FieldLabel label='User Login Methods' textProps={{ fontSize: "18px", fontWeight: "bolder" }} isRequired />
                    <AppTypography fontSize="14px" color="#C2C2C2">Allow or deny login option for each wallet</AppTypography>
                </Flex>
                <Flex direction={"column"} gap={"8px"}>
                    {isLoading ? <LoginMethodsLoading /> : response.map((chain, index) => <ChainAccordion key={index} label={chain} />)}
                </Flex>
            </Flex>
        </AppCard>
    )
}

export default SupportedLoginMethods