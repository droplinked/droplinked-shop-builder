import { Box, Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useContext } from 'react'
import { designContext } from '../../design-context'

function DesignPagePreview() {
    const { shop } = useProfile();
    const { state: { device } } = useContext(designContext)

    return (
        <Flex justifyContent="center">
            <AppScrollBar transition=".3s" width={device === "mobile" ? "300px" : "100%"}>
                <iframe
                    style={{ width: "100%", height: "600px" }}
                    src={"https://dev.droplinked.io/" + shop.name}
                    title="Module"
                ></iframe>
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview