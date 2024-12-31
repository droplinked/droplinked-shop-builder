import { Flex } from '@chakra-ui/react'
import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import useDesignMakerHooks from 'pages/products/hooks/useDesignMakerLogic'
import React from 'react'
import FooterControls from '../FooterControls'
import classes from './styles.module.scss'

interface Props {
    onClose: () => void
}

function DesignMakerContent({ onClose }: Props) {
    const {
        iframeRef,
        isIframeLoaded,
        isLoading,
        publish_product,
        handleSave,
        handleBack
    } = useDesignMakerHooks(onClose)

    return (
        <Flex direction="column" gap={4}>
            <div ref={iframeRef} id="printful" className={classes.model} />

            {!isIframeLoaded && <FullScreenLoading />}

            <FooterControls
                onClose={onClose}
                isLoading={isLoading}
                isIframeLoaded={isIframeLoaded}
                handleSave={handleSave}
                handleBack={handleBack}
                publishProduct={publish_product}
            />
        </Flex>
    )
}

export default DesignMakerContent