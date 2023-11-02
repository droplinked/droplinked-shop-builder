import { Flex, VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import React, { useContext } from 'react'
import { designContext } from '../../design-context'
import PreviewFooter from './parts/footer/PreviewFooter';
import PreviewHeader from './parts/header/PreviewHeader';
import PreviewWrapper from './parts/wrapper/PreviewWrapper';

function DesignPagePreview() {
    const { state: { device, shop: { shopDesign: { backgroundBody } } } } = useContext(designContext)

    return (
        <Flex justifyContent="center">
            <AppScrollBar transition=".3s" width={device === "mobile" ? "300px" : "100%"} backgroundColor={backgroundBody || "#1e1e1e"}>
                <VStack align="stretch" spacing="0">
                    <PreviewHeader />
                    <PreviewWrapper />
                    <PreviewFooter />
                </VStack>
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview