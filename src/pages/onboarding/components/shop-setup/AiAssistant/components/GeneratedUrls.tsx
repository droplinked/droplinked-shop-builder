import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import Input from 'components/redesign/input/Input'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { appDevelopment } from 'utils/app/variable'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import { useQuery } from 'react-query'
import { generateDomains } from 'lib/apis/ai/services'
import useAppToast from 'hooks/toast/useToast'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
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
                <Grid templateColumns="1fr 1fr 1fr" gap={4}>
                    {isFetching && <ItemsSkeleton />}

                    {!isFetching && urls?.map((url, index) => (
                        <Flex
                            key={index}
                            background={selectedUrl === url ? "rgba(43, 207, 161, 0.10)" : "transparent"}
                            paddingInline={4}
                            paddingBlock={3}
                            borderRadius={8}
                            border={selectedUrl === url ? "1.5px solid #2BCFA1" : "1.5px solid #292929"}
                            alignItems="center"
                            cursor="pointer"
                            transition="all 0.3s ease"
                            onClick={() => handleClick(url)}
                        >
                            <Text
                                color={selectedUrl === url ? "#2BCFA1" : "#fff"}
                                fontSize={16}
                                fontWeight={400}
                                transition="color 0.3s ease"
                            >
                                {url}
                            </Text>
                        </Flex>
                    ))}
                </Grid>
            </Flex>
        </GeneratedContentWrapper>
    )
}
