import { Grid } from '@chakra-ui/react'
import { GenerateWithAiData } from 'pages/onboarding/types/aiAssistant'
import React from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import SelectableItem from './SelectableItem'
import SelectableItemsSkeleton from './SelectableItemsSkeleton'

interface Props extends GenerateWithAiData {
    names: string[]
    isLoading: boolean
    refetch: () => void
    selectedName: string
    onNameChange: (name: string) => void
}

export default function GeneratedNames({ names, isLoading, refetch, selectedName, onNameChange }: Props) {
    return (
        <GeneratedContentWrapper
            title='Name'
            onRetry={refetch}
            isLoading={isLoading}
            flexProps={{
                px: { base: 4, md: 9, lg: "48px" }
            }}
        >
            <Grid templateColumns="1fr 1fr 1fr" gap={4} overflowX="auto">
                {isLoading && <SelectableItemsSkeleton />}

                {!isLoading && names?.map((name, index) => (
                    <SelectableItem
                        key={index}
                        isSelected={selectedName === name}
                        item={{ title: name }}
                        onClick={() => onNameChange(name)}
                    />
                ))}
            </Grid>
        </GeneratedContentWrapper>
    )
}
