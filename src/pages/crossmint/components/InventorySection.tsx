import { Box, Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import AppButton from 'components/redesign/button/AppButton'
import MessageBox from 'components/redesign/message-box/MessageBox'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import useAppToast from 'hooks/toast/useToast'
import { getRecordedProducts, initiateNftCliming } from 'services/crawler/services'
import SectionContainer from 'pages/settings/components/common/SectionContainer'
import SectionContent from 'pages/settings/components/common/SectionContent'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import useAppStore from 'stores/app/appStore'
import { appDevelopment } from 'utils/app/variable'
import LoadingSkeleton from './LoadingSkeleton'

function InventorySection({ crossmintWallet }: { crossmintWallet?: string }) {
    const { showToast } = useAppToast()
    const { user: { wallets } } = useAppStore()
    const { mutateAsync, isLoading } = useMutation({
        mutationFn: (polygonAddress: string) => initiateNftCliming(polygonAddress),
        onSuccess(data) {
            showToast({
                type: 'success',
                message: data.data.message,
            })
        },
    })
    const { isFetching, data } = useQuery({
        queryFn: () => getRecordedProducts(),
        queryKey: ['recorded-products'],
        enabled: !!crossmintWallet,
        select(data) {
            return data.data
        }
    })

    const polygonWallet = wallets?.find((w) => w.type === "POLYGON")
    const isEmpty = data?.length === 0

    return (
        <SectionContainer title="Onchain Inventory">
            <SectionContent
                title="Recorded Products"
                description="Browse, organize and transfer inventory records from here."
                rightContent={
                    appDevelopment && (
                        <AppButton
                            variant='normal'
                            marginLeft="auto"
                            padding="10px 14px"
                            isLoading={isLoading}
                            loadingText="Claiming NFTs..."
                            isDisabled={!polygonWallet?.address}
                            onClick={() => mutateAsync(polygonWallet?.address)}
                        >
                            Transfer Records
                        </AppButton>
                    )}
            />
            {!polygonWallet?.address &&
                <Box width="600px">
                    <MessageBox
                        theme='warning'
                        title='Polygon Wallet Not Connected'
                        description='Please go to the Onchain Inventory page, connect your Polygon wallet using the Connect Wallet button, and then return to this page.'
                        rightContent={
                            <Link to="/analytics/onchain-records">
                                <AppButton ml={4}>
                                    Onchain Inventory
                                </AppButton>
                            </Link>
                        }
                    />
                </Box>
            }
            {isFetching && <LoadingSkeleton isFetching={isFetching} />}
            {!isFetching && !isEmpty &&
                <RuledGrid
                    columns={1}
                    borderRadius={8}
                >
                    {data?.map((item) => (
                        <Flex key={item.id} alignItems="center" gap={4} padding={4}>
                            <AppImage width={10} aspectRatio={1} borderRadius={8} src={item.image} />
                            <Text color='text.white'>{item.title}</Text>
                        </Flex>
                    ))}
                </RuledGrid>
            }
        </SectionContainer>
    )
}

export default InventorySection 