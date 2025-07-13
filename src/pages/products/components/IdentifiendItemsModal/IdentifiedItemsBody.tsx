import { Flex, ModalBody } from '@chakra-ui/react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import Pagination from './Pagination'
import MessageBox from 'components/redesign/message-box/MessageBox'
import { CrawledProductsType } from 'pages/products/utils/types'
import ItemsTable from './ItemsTable'
import { usePagination } from '../../hooks/usePagination'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import SwitchBox from 'components/redesign/switch-box/SwitchBox'
import { appDevelopment } from 'utils/app/variable'

interface Props {
    selectedProducts: string[]
    headerCheckState: 'checked' | 'indeterminate' | 'unchecked'
    handleHeaderCheckboxChange: () => void
    handleItemSelection: (url: string) => void
    isSelectionDisabled: (url: string) => boolean
    crawledProduct: CrawledProductsType[]
    maxSelectableItems: number
    shouldRecord: boolean
    setshouldRecord: (value: boolean) => void
}

export default function IdentifiedItemsBody({ handleItemSelection, headerCheckState, handleHeaderCheckboxChange, selectedProducts, crawledProduct, maxSelectableItems, isSelectionDisabled, setshouldRecord, shouldRecord }: Props) {
    const { t } = useLocaleResources('products');
    const ITEMS_PER_PAGE = 8

    const {
        currentPage,
        totalPages,
        currentItems,
        handlePageChange
    } = usePagination({
        items: crawledProduct,
        itemsPerPage: ITEMS_PER_PAGE
    })

    return (
        <ModalBody
            display="flex"
            flexDirection="column"
            gap={4}
            paddingBlock={{ lg: '48px !important', md: '32px !important', base: '16px !important' }}
            borderTop="1px solid"
            borderBottom="1px solid"
            borderColor="neutral.gray.800"
            overflow="auto"
            maxHeight="600px"
        >
            <Flex direction="column" gap={6}>
                {selectedProducts.length >= maxSelectableItems && (
                    <MessageBox
                        title={t('identifiedItemsModal.maxSelectionLimit.title')}
                        description={t('identifiedItemsModal.maxSelectionLimit.description', { selected: maxSelectableItems, total: crawledProduct.length })}
                        theme='warning'
                    />
                )}

                {appDevelopment && (
                    <RuledGrid columns={1} borderRadius={8} p="16px 24px">
                        <SwitchBox
                            title={t('identifiedItemsModal.dropRecords.title')}
                            description={t('identifiedItemsModal.dropRecords.description')}
                            isChecked={shouldRecord}
                            onToggle={() => setshouldRecord(!shouldRecord)}
                            showBetaBadge
                        />
                    </RuledGrid>
                )}

                <ItemsTable
                    items={currentItems}
                    selectedProducts={selectedProducts}
                    headerCheckState={headerCheckState}
                    onHeaderCheckboxChange={handleHeaderCheckboxChange}
                    onItemClick={handleItemSelection}
                    isSelectionDisabled={isSelectionDisabled}
                />

                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </Flex>
        </ModalBody>
    )
}
