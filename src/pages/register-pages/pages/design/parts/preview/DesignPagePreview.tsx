import { Flex } from '@chakra-ui/react'
import AppScrollBar from 'components/common/scrollbar'
import { useProfile } from 'functions/hooks/useProfile/useProfile';
import React, { useContext } from 'react'
import { designContext } from '../../design-context'
import PreviewHeader from './parts/header/PreviewHeader';
import PreviewWrapper from './parts/wrapper/PreviewWrapper';

function DesignPagePreview() {
    const { state: { device } } = useContext(designContext)

    return (
        <Flex justifyContent="center" backgroundColor="#1e1e1e">
            <AppScrollBar transition=".3s" width={device === "mobile" ? "300px" : "100%"}>
                <Flex justifyContent="center"><PreviewHeader /></Flex>
                <PreviewWrapper />
            </AppScrollBar>
        </Flex>
    )
}

export default DesignPagePreview