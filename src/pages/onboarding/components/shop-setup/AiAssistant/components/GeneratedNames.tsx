import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { Flex, Grid, Text } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import { useQuery } from 'react-query'
import { generateShopNames } from 'lib/apis/ai/services'
import useAppToast from 'hooks/toast/useToast'
import ItemsSkeleton from './ItemsSkeleton'
import Item from './Item'

interface Props extends GenerateWithAiData {
    businessCategory: string
    businessDescribe: string
}

export default function GeneratedNames({ businessCategory, businessDescribe }: Props) {
    const { updateOnboardingState, storeSetup } = useOnboardingStore()
    const { showToast } = useAppToast()

    const { isFetching, data: names, refetch } = useQuery({
        queryFn: () => generateShopNames({ category: businessCategory, prompt: businessDescribe }),
        queryKey: ["generateShopNames"],
        enabled: !!businessCategory && !!businessDescribe,
        select(data) {
            return data.data.shopNames || []
        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
    })

    const selectedName = storeSetup.name

    const handleClick = (name: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, name })
    }

    useEffect(() => {
        handleClick(names?.[0])
    }, [])

    return (
        <GeneratedContentWrapper title='Name' onRetry={refetch} isLoading={isFetching}>
            <Grid templateColumns="1fr 1fr 1fr" gap={4} overflowX="auto">
                {isFetching && <ItemsSkeleton />}

                {!isFetching && names?.map((name, index) => (
                    <Item
                        key={index}
                        isSelected={selectedName === name}
                        item={{ title: name }}
                        onClick={() => handleClick(name)}
                    />
                ))}
            </Grid>
        </GeneratedContentWrapper>
    )
}
