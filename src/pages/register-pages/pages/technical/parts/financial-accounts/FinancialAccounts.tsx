import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import { AxiosResponse } from 'axios'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { getShopInformationService } from 'lib/apis/shop/shopServices'
import { createStripeOnboardingLinkService } from 'lib/apis/stripe/stripeServices'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function FinancialAccounts() {
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const { isFetching: isFetchingShopData, data: shop } = useQuery({
        queryFn: getShopInformationService,
        refetchOnWindowFocus: false
    })

    const handleStripeActions = async (service: () => Promise<AxiosResponse>, target = "_self") => {
        try {
            setLoading(true)
            const res = await service()
            window.open(res.data.url, target)
        } catch (error) {
            showToast({ message: (error as Error).message, type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AppCard>
            <Flex direction='column' gap='24px'>
                <Flex direction='column' gap='8px'>
                    <AppTypography fontSize='18px' fontWeight='bold' color='#FFFFFF'>Financial Accounts</AppTypography>
                    <AppTypography fontSize='14px' color='#C2C2C2'>Connect and Manage your online payment services or bank accounts.</AppTypography>
                </Flex>
                <BlackBox padding='24px' display='flex' alignItems='center'>
                    <Flex width='100%' justifyContent='space-between' alignItems='center'>
                        <Flex alignItems='center' gap='16px'>
                            <AppIcons.StripeS />
                            <AppTypography fontSize='14px' fontWeight='bold' color='#C2C2C2'>Stripe</AppTypography>
                        </Flex>
                        {
                            isFetchingShopData ?
                                <AppSkeleton isLoaded={false} width={"160px"} height={8}>{""}</AppSkeleton> :
                                shop?.data.data.onboardedExpressStripeAccount ?
                                    <AppTypography height={8} lineHeight={8} fontSize={14} color={"white"}>Your account has ben set up successfully!</AppTypography> :
                                    <BasicButton sizes='medium' isLoading={isLoading} onClick={() => handleStripeActions(createStripeOnboardingLinkService)}>Create Account</BasicButton>
                        }
                    </Flex>
                </BlackBox>
            </Flex >
        </AppCard >
    )
}

export default FinancialAccounts