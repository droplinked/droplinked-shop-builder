import { Box, Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { designContext } from '../../design-context'

function DesignPagePreview() {
    const dataShop = useProfile();
    const { state: { device, shop } } = useContext(designContext)
    const url = useMemo(() => "https://dev.droplinked.io/" + dataShop.shop.name + `?${Math.random()}`, [shop])
    const iframeElement = useRef<any>(null)

    useEffect(() => {
        console.log("Faghat majid", shop, url);

        if (iframeElement.current) iframeElement.current.contentWindow.postMessage(shop, url);
    }, [shop, iframeElement])

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