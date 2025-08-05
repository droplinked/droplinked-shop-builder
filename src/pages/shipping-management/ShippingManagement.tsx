import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/useDebounce/useDebounce'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React, { useState } from 'react'
import PageHeader from './components/PageHeader'
import ShippingProfileTable from './components/ShippingProfileTable/ShippingProfileTable'

function ShippingManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const { t } = useLocaleResources("common")

    return (
        <PageGrid.Root>
            <PageHeader />

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