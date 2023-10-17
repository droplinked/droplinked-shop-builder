import { Box, Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import React, { useContext } from 'react'
import { designContext } from '../../design-context'

function DesignPagePreview() {
    const { state: { device } } = useContext(designContext)

    return (
        <Flex justifyContent="center">
            <AppScrollBar width={device === "mobile" ? "300px" : "100%"}>
                <iframe
                    style={{ width: "100%", height: "600px" }}
                    src="https://dev.droplinked.io/mehrpouya"
                    title="Module"
                ></iframe>
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview