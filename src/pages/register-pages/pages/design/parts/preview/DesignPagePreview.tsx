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

    const shouldScroll = () => {
        const validOptions = [null, "theme", "profile", "products"];
        return validOptions.includes(optionSelected);
    };
    
    return (
        <designPreviewContext.Provider value={{ scrollRef }}>
            <Flex justifyContent="center">
                <AppScrollBar transition=".3s" border="2px solid #262626" borderRadius="8px" height={{ base: "40vh", md: "53vh", 'xl': "64vh" }} overflow={shouldScroll() ? "scroll" : "hidden"} width={device === "mobile" ? "300px" : "100%"} padding="2px" scrollbarHide={true} backgroundColor={backgroundBody || "#1e1e1e"}>
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