import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import Input from 'components/redesign/input/Input'
import useAppToast from 'hooks/toast/useToast'
import { generateDomains } from 'lib/apis/ai/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { appDevelopment } from 'utils/app/variable'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import Item from './Item'
import ItemsSkeleton from './ItemsSkeleton'

interface Props extends GenerateWithAiData {
    businessCategory: string
    businessDescribe: string
}

export default function GeneratedUrls({ businessCategory, businessDescribe }: Props) {
    const { showToast } = useAppToast()
    const { updateOnboardingState, storeSetup } = useOnboardingStore()

    const { isFetching, data: urls, refetch } = useQuery({
        queryFn: () => generateDomains({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateDomains"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.domains || []
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
    })

    const selectedUrl = storeSetup.shop_url

    const handleClick = (shop_url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, shop_url })
    }

    useEffect(() => {
        handleClick(urls?.[0])
    }, [])

    return (
        <GeneratedContentWrapper title='URL' onRetry={refetch} isLoading={isFetching}>
            <Flex flexDirection="column" gap={4} userSelect="none">
                <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                    <Input
                        inputProps={{
                            paddingInline: 4,
                            paddingBlock: 3,
                            fontSize: { base: 14, md: 16 },
                            value: selectedUrl,
                            placeholder: "Select your URL",
                            isReadOnly: true,
                        }}
                        inputContainerProps={{
                            padding: 0,
                            gap: 0,
                        }}
                        leftElement={
                            <Box paddingInline={4} paddingBlock={3} borderRadius={8} background="#1C1C1C">
                                <Text fontSize={{ base: 14, md: 16 }} fontWeight={400} color="#7b7b7b">
                                    {`${appDevelopment ? "dev." : ""}droplinked.io/`}
                                </Text>
                            </Box>
                        }
                    />
                </AppSkeleton>
                <Grid templateColumns="1fr 1fr 1fr" gap={4} overflowX="auto">
                    {isFetching && <ItemsSkeleton />}

                    {!isFetching && urls?.map((url, index) => (
                        <Item
                            isSelected={selectedUrl === url}
                            item={{ title: url }}
                            onClick={() => handleClick(url)}
                        />
                    ))}
                </Grid>
            </Flex>
        </GeneratedContentWrapper>
    )
}
