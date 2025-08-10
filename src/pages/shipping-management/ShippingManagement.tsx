import { useDisclosure } from '@chakra-ui/react'
import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import ShippingProfileDrawer from './components/ShippingProfileDrawer/ShippingProfileDrawer'
import ShippingProfileTable from './components/ShippingProfileTable/ShippingProfileTable'

function ShippingManagement() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { t } = useLocaleResources("common")

    return (
        <>
            <PageGrid.Root>
                <PageGrid.Header
                    title="Shipping Profile Management"
                    description='Create, edit and manage shipping profiles here.'
                    actionButtons={[
                        {
                            title: 'New Shipping Profile',
                            leftIcon: <PlusMd />,
                            onClick: onOpen
                        }
                    ]}
                />

                <PageGrid.Content>
                    <ShippingProfileTable />
                </PageGrid.Content>
            </PageGrid.Root>

            <ShippingProfileDrawer isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ShippingManagement