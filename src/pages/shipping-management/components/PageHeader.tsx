import { useDisclosure } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import React from 'react'
import ShippingProfileDrawer from './ShippingProfileDrawer/ShippingProfileDrawer'

function PageHeader() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <PageGrid.Header
                title="Shipping Profile Management"
                description='Create, edit and manage shipping profiles here.'
                actionButtons={[
                    {
                        title: 'New Shipping Profile',
                        leftIcon: <PlusMd />,
                        onClick: onOpen,
                    },
                ]}
            />

            <ShippingProfileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default PageHeader
