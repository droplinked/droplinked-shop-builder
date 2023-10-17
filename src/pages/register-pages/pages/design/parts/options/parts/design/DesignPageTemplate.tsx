import { VStack } from '@chakra-ui/react'
import React from 'react'
import DesignPageCard from '../card/DesignPageCard'
import OptionFonts from './parts/fonts/OptionFonts'
import OptionImages from './parts/images/OptionImages'
import OptionTemplatePreview from './parts/preview/OptionTemplatePreview'

function DesignPageTemplate() {
    return (
        <DesignPageCard description='Provide details' title='Design Style'>
            <VStack align="stretch" spacing="24px">
                <OptionTemplatePreview />
                <OptionImages />
                <OptionFonts />
            </VStack>
        </DesignPageCard>
    )
}

export default DesignPageTemplate