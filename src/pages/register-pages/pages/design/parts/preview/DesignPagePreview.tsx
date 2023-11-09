import { Flex, VStack } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import React, { useContext, useEffect, useRef } from 'react'
import { designContext } from '../../design-context'
import designPreviewContext from './context';
import PreviewFooter from './parts/footer/PreviewFooter';
import PreviewHeader from './parts/header/PreviewHeader';
import PreviewWrapper from './parts/wrapper/PreviewWrapper';

function DesignPagePreview() {
    const { state: { device, shop: { shopDesign: { backgroundBody } }, optionSelected } } = useContext(designContext)
    const scrollRef = useRef(null)

    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "start" });
    }, [scrollRef, optionSelected])


    return (
        <designPreviewContext.Provider value={{ scrollRef }}>
            <Flex justifyContent="center">
                <AppScrollBar transition=".3s" height="65vh" overflow="auto" width={device === "mobile" ? "300px" : "100%"} backgroundColor={backgroundBody || "#1e1e1e"}>
                    <VStack align="stretch" spacing="0" position="relative">
                        <PreviewHeader />
                        <PreviewWrapper />
                        <PreviewFooter />
                    </VStack>
                </AppScrollBar>
            </Flex>
        </designPreviewContext.Provider>
    )
}

export default DesignPagePreview