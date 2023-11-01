import { Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useContext } from 'react'
import { designContext } from '../../design-context'
import PreviewHeader from './parts/header/PreviewHeader';

function DesignPagePreview() {
    const { state: { device } } = useContext(designContext)

    return (
        <Flex justifyContent="center">
            <AppScrollBar transition=".3s" width={device === "mobile" ? "300px" : "100%"}>
                <PreviewHeader />
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview