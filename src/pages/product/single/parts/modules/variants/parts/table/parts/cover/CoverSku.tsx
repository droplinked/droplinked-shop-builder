import { useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTooltip from 'components/common/tooltip/AppTooltip'
import React from 'react'
import CoversModal from './parts/modal/CoversModal'

interface ICoverSku {
    index: number
    image: string
}

function CoverSku({ index, image }: ICoverSku) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const attr = {
        cursor: 'pointer',
        width: '15px',
        height: '15px',
    }

    return (
        <>
            {image ? (
                <AppImage src={image} onClick={onOpen} {...attr} />
            ) : (
                <AppTooltip label="Choose variant cover amung the product images">
                    <AppIcons.Cover onClick={onOpen} {...attr} />
                </AppTooltip>
            )}
            {isOpen && <CoversModal image={image} index={index} close={onClose} open={true} />}
        </>
    )
}

export default CoverSku