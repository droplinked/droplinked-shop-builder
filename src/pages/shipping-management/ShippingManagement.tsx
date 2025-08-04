import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ShippingManagement() {
    const navigate = useNavigate()
    const { t } = useLocaleResources("common")

    const shippingProfiles = [
        { id: 1, name: 'Standard Shipping', description: 'Standard shipping profile' },
    ]

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Shipping Profile Management"
                description='Create, edit and manage shipping profiles here.'
                actionButtons={[
                    {
                        title: 'New Shipping Profile',
                        leftIcon: <PlusMd />,
                        onClick: () => navigate('/shipping-management/new')
                    }
                ]}
            />

            <PageGrid.Content>

            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default ShippingManagement