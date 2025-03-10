import React, { useEffect } from 'react'
import GeneratedContentWrapper from './GeneratedContentWrapper'
import { Flex, Grid, Text } from '@chakra-ui/react'
import useOnboardingStore from 'pages/onboarding/stores/useOnboardingStore'

interface Props {
    names: string[]
}

export default function GeneratedNames({ names }: Props) {
    const { updateOnboardingState, storeSetup } = useOnboardingStore();
    const selectedName = storeSetup.name;

    const handleClick = (name: string) => {
        updateOnboardingState("storeSetup", { ...storeSetup, name })
    }

    useEffect(() => {
        handleClick(names[0])
    }, [])

    return (
        <GeneratedContentWrapper title='Name'>
            <Grid templateColumns="1fr 1fr 1fr" gap={4}>
                {names.map((name, index) => (
                    <Flex
                        key={index}
                        background={selectedName === name ? "rgba(43, 207, 161, 0.10)" : "transparent"}
                        paddingInline={4}
                        paddingBlock={3}
                        borderRadius={8}
                        border={selectedName === name ? "1.5px solid #2BCFA1" : "1.5px solid #292929"}
                        alignItems="center"
                        cursor="pointer"
                        transition="all 0.3s ease"
                        onClick={() => handleClick(name)}
                    >
                        <Text
                            color={selectedName === name ? "#2BCFA1" : "#fff"}
                            fontSize={16}
                            fontWeight={400}
                            transition="color 0.3s ease"
                        >
                            {name}
                        </Text>
                    </Flex>
                ))}
            </Grid>
        </GeneratedContentWrapper>
    )
}
