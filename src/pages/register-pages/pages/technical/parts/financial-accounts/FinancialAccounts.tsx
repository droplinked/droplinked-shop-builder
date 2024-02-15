import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppCard from 'components/common/card/AppCard'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import useAppToast from 'functions/hooks/toast/useToast'
import { getShopInformationService } from 'lib/apis/shop/shopServices'
import { createStripeLoginLinkService, createStripeOnboardingLinkService } from 'lib/apis/stripe/stripeServices'
import { BlackBox } from 'pages/register-pages/RegisterPages-style'
import React, { useState } from 'react'
import { useQuery } from 'react-query'

function FinancialAccounts() {
    const [isLoading, setLoading] = useState(false)
    const { showToast } = useAppToast()
    const { isLoading: isFetchingShopData, data: shop, refetch: refetchShopData } = useQuery({
        queryFn: getShopInformationService,
        refetchOnWindowFocus: false
    })

    const handleConnectAccount = async () => {
        try {
            setLoading(true)
            const res = await createStripeOnboardingLinkService()
            window.open(res.data.url, '_blank')
        } catch (error) {
            showToast({ message: (error as Error).message, type: 'error' })
        }
        finally {
            setLoading(false)
        }
    }

    const handleViewAccount = async () => {
        try {
            setLoading(true)
            const res = await createStripeLoginLinkService()
            window.open(res.data.url, '_blank')
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
                        <AppSkeleton isLoaded={!isFetchingShopData} height='32px'>
                            {
                                shop?.data.data.onboardedExpressStripeAccount ?
                                    <BasicButton variant='outline' sizes='medium' isLoading={isLoading} onClick={handleViewAccount}>View Account</BasicButton> :
                                    <BasicButton sizes='medium' isLoading={isLoading} onClick={handleConnectAccount}>Connect Account</BasicButton>
                            }
                        </AppSkeleton>
                    </Flex>
                </BlackBox>
            </Flex >
        </AppCard >
    )
}

export default FinancialAccounts