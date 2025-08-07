import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'
import PageEmptyState from 'components/redesign/page-empty-state/PageEmptyState'
import React from 'react'
import { useDisclosure } from '@chakra-ui/react'
import ShippingProfileDrawer from '../ShippingProfileDrawer/ShippingProfileDrawer'

function ShippingProfileEmptyState() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <PageEmptyState
                image="https://upload-file-droplinked.s3.amazonaws.com/b42de26d0f3cad2fc37411de56fd0c095c05de0d630dc6b19a4dab199c674c4e_or.png"
                imageProps={{ width: '300px', height: '228px' }}
                title="Create a shipping profile to get started!"
                action={{
                    text: 'New Shipping Profile',
                    icon: <PlusSm color="#2bcfa1" />,
                    onClick: onOpen,
                }}
            />

            <ShippingProfileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ShippingProfileEmptyState
