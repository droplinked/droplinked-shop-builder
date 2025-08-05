import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import ShippingProfileTable from './components/ShippingProfileTable/ShippingProfileTable'

function ShippingManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { t } = useLocaleResources("common")

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Shipping Profile Management"
                description='Create, edit and manage shipping profiles here.'
                actionButtons={[
                    {
                        title: 'New Shipping Profile',
                        leftIcon: <PlusMd />,
                        onClick: () => console.log("clicked!")
                    }
                ]}
            />

            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    placeholder: t("common:search"),
                    onChange: (e) => setSearchTerm(e.target.value)
                }}
            />

            <PageGrid.Content>
                <ShippingProfileTable searchTerm={debouncedSearchTerm} />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default ShippingManagement