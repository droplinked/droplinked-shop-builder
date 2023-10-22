import { Box, Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useContext, useEffect, useRef } from 'react'
import { designContext } from '../../design-context'

function DesignPagePreview() {
    const dataShop = useProfile();
    const { state: { device, shop } } = useContext(designContext)
    const url = "https://dev.droplinked.io/" + dataShop.shop.name
    const iframeElement = useRef<any>(null)

    useEffect(() => {
        iframeElement.current.contentWindow.postMessage(shop, url);
    }, [shop])

    return (
        <Flex justifyContent="center">
            <AppScrollBar transition=".3s" width={device === "mobile" ? "300px" : "100%"}>
                <iframe
                    style={{ width: "100%", height: "600px" }}
                    src={url}
                    ref={iframeElement}
                    title="Module"
                ></iframe>
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview