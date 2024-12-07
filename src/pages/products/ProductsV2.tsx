import { Box, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'functions/hooks/debounce/useDebounce'
import React, { useState } from 'react'
import ProductReorderModal from './components/ProductReorderModal/ProductReorderModal'
import ProductTable from './components/ProductTable'
import ProductTypesModal from './components/ProductTypesModal/ProductTypesModal'

function ProductsV2() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)
    const productTypeModal = useDisclosure()
    const productReorderModal = useDisclosure()

    return (
        <>
            <PageGrid.Root>
                <PageGrid.Header
                    title="Products"
                    description="Manage products all in one place. Easily create, view, and track them here."
                    buttons={[
                        {
                            caption: "New Product",
                            leftIcon: <AppIcons.BlackPlus />,
                            onClick: productTypeModal.onOpen
                        },
                        {
                            caption: "Import",
                            variant: "secondary",
                            leftIcon: <Box sx={{ svg: { path: { stroke: 'white' } } }}><AppIcons.Download /></Box>,
                            onClick: () => console.log("import")
                        },
                        {
                            caption: "Reorder Products",
                            variant: "secondary",
                            onClick: productReorderModal.onOpen
                        }
                    ]}
                />
                <PageGrid.Actions search={{ value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }} />
                <PageGrid.Content>
                    <ProductTable searchTerm={debouncedSearchTerm} />
                </PageGrid.Content>
            </PageGrid.Root>
            <ProductTypesModal isOpen={productTypeModal.isOpen} onClose={productTypeModal.onClose} />
            <ProductReorderModal isOpen={productReorderModal.isOpen} onClose={productReorderModal.onClose} />
        </>
    )
}

export default ProductsV2