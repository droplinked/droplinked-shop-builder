import { Box, Flex, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppInput from 'components/redesign/input/AppInput'
import useAppToast from 'hooks/toast/useToast'
import { generateDomains } from 'lib/apis/ai/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import { useQuery } from 'react-query'
import { appDevelopment } from 'utils/app/variable'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import SelectableItem from './SelectableItem'
import SelectableItemsSkeleton from './SelectableItemsSkeleton'

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
        onSuccess(data) {
            handleClick(data?.[0])
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
        refetchOnMount: false,
    })

    const selectedUrl = storeSetup.shop_url

    const handleClick = (shop_url: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, shop_url })
    }

    return (
        <GeneratedContentWrapper title='URL' onRetry={refetch} isLoading={isFetching}>
            <Flex flexDirection="column" gap={4} userSelect="none">
                <AppSkeleton isLoaded={!isFetching} borderRadius={8}>
                    <AppInput
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
                <Flex flexWrap="wrap"  gap={4} overflow="auto" >
                    {isFetching && <SelectableItemsSkeleton />}

                    {!isFetching && urls?.map((url, index) => (
                        <SelectableItem
                            key={index}
                            isSelected={selectedUrl === url}
                            item={{ title: url }}
                            onClick={() => handleClick(url)}
                        />
                    ))}
                </Flex>
            </Flex>
        </GeneratedContentWrapper>
    )
}
