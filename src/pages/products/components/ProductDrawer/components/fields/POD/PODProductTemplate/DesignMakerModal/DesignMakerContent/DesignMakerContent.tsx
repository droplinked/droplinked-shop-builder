import { Flex } from '@chakra-ui/react'
import LoadingComponent from 'components/common/loading-component/LoadingComponent'
import useDesignMakerHooks from 'pages/products/hooks/useDesignMakerLogic'
import React from 'react'
import FooterControls from '../FooterControls'
import classes from './styles.module.scss'

interface Props {
    onClose: () => void
}

function DesignMakerContent({ onClose }: Props) {
    const { iframeRef, isIframeLoaded, isLoading, handleSave } = useDesignMakerHooks(onClose)

    return (
        <Flex direction="column" gap={4}>
            <div ref={iframeRef} id="printful" className={classes.model} />

            {!isIframeLoaded && <LoadingComponent />}

            <FooterControls
                onClose={onClose}
                isLoading={isLoading}
                isIframeLoaded={isIframeLoaded}
                handleSave={handleSave}
            />
        </Flex>
    )
}

export default DesignMakerContent