import { Grid } from '@chakra-ui/react'
import useAppToast from 'hooks/toast/useToast'
import { generateShopNames } from 'lib/apis/ai/services'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import { useQuery } from 'react-query'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import SelectableItem from './SelectableItem'
import SelectableItemsSkeleton from './SelectableItemsSkeleton'

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
        onSuccess(data) {
            handleClick(data?.[0])

        },
        onError(err: any) {
            showToast({ message: err.response.data.data.message, type: "error" })
        },
        refetchOnMount: false,
    })

    const selectedName = storeSetup.name

    const handleClick = (name: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, name })
    }

    return (
        <GeneratedContentWrapper
            title='Name'
            onRetry={refetch}
            isLoading={isFetching}
            flexProps={{
                px: { base: 4, md: 9, lg: "48px" }
            }}
        >
            <Grid templateColumns="1fr 1fr 1fr" gap={4} overflowX="auto">
                {isFetching && <SelectableItemsSkeleton />}

                {!isFetching && names?.map((name, index) => (
                    <SelectableItem
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
