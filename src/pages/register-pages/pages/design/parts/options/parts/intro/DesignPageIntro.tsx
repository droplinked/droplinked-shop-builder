import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import OptionLayout from './parts/layout/OptionLayout'

function DesignPageIntro() {
    return (
        <DesignPageCard title='Intro Section' description='Provide hero section details'>
            <VStack align="stretch" spacing="24px">
                <OptionLayout />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageIntro