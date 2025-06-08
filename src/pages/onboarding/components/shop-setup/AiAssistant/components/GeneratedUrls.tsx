import { Box, Flex, Text } from '@chakra-ui/react'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppInput from 'components/redesign/input/AppInput'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import { appDevelopment } from 'utils/app/variable'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import SelectableItem from './SelectableItem'
import SelectableItemsSkeleton from './SelectableItemsSkeleton'

interface Props extends GenerateWithAiData {
    urls: string[]
    isLoading: boolean
    refetch: () => void
    selectedUrl: string
    onUrlChange: (url: string) => void
}

export default function GeneratedUrls({ urls, isLoading, refetch, selectedUrl, onUrlChange }: Props) {
    return (
        <GeneratedContentWrapper
            title='URL'
            onRetry={refetch}
            isLoading={isLoading}
            flexProps={{
                px: { base: 4, md: 9, lg: "48px" }
            }}
        >
            <Flex flexDirection="column" gap={4} userSelect="none">
                <AppSkeleton isLoaded={!isLoading} borderRadius={8}>
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
                <Flex flexWrap="wrap" gap={4} overflow="auto" >
                    {isLoading && <SelectableItemsSkeleton />}

                    {!isLoading && urls?.map((url, index) => (
                        <SelectableItem
                            key={index}
                            isSelected={selectedUrl === url}
                            item={{ title: url }}
                            onClick={() => onUrlChange(url)}
                        />
                    ))}
                </Flex>
            </Flex>
        </GeneratedContentWrapper>
    )
}
