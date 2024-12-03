import { Box } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import React, { useState } from 'react'
import ProductTable from './components/ProductTable'

function ProductsV2() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Products"
                description="Manage products all in one place. Easily create, view, and track them here."
                buttons={[
                    {
                        caption: "New Product",
                        leftIcon: <AppIcons.BlackPlus />,
                        onClick: () => console.log("new collection")
                    },
                    {
                        caption: "Import",
                        variant: "secondary",
                        leftIcon: (
                            <Box sx={{ svg: { path: { stroke: 'white' } } }}>
                                <AppIcons.Download />
                            </Box>
                        ),
                        onClick: () => console.log("import")
                    },
                    {
                        caption: "Reorder Products",
                        variant: "secondary",
                        onClick: () => console.log("Reorder Products")
                    }
                ]}
            />
            <PageGrid.Actions search={{ value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }} />
            <PageGrid.Content>
                <ProductTable searchTerm={debouncedSearchTerm} />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default ProductsV2