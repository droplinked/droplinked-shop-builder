import { Flex } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'
import DataGridButtons from './components/buttons/DatagridButtons'
import FiltersDataGrid from './components/filters/FiltersDatagrid'
import DataGridSkeleton from './components/skeleton/DatagridSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import AppIcons from 'assest/icon/Appicons'
import { PageGridActionsProps, PageGridContentProps, PageGridHeaderProps, PageGridRootProps } from './interface'
import Input from '../input/Input'

// Context - simplified since we're not passing everything through context
const PageGridContext = createContext<{ loading?: boolean }>({})
const usePageGridContext = () => useContext(PageGridContext)

// Root Component - simplified
function PageGridRoot({ children, loading }: PageGridRootProps) {
    return (
        <PageGridContext.Provider value={{ loading }}>
            <Flex width="100%" flexDirection="column" alignItems="start">
                {children}
            </Flex>
        </PageGridContext.Provider>
    )
}

// Header Component
function PageGridHeader({ title, description, buttons, flexProps }: PageGridHeaderProps) {
    return (
        <Flex {...flexProps} w="full" marginBottom={flexProps.marginBottom || "36px"} flexDirection={flexProps.flexDirection || "row"} justifyContent={flexProps.justifyContent || "space-between"} alignItems={flexProps.alignItems || "start"}>
            <Flex flexDirection="column" alignItems="start">
                {title && (
                    <AppTypography color="#fff" fontSize="24px" fontWeight={700}>
                        {title}
                    </AppTypography>
                )}
                {description && (
                    <AppTypography color="#b1b1b1" fontSize="16px">
                        {description}
                    </AppTypography>
                )}
            </Flex>
            {buttons && <DataGridButtons buttons={buttons} />}
        </Flex>
    )
}

// Actions Component
function PageGridActions({ search, filters }: PageGridActionsProps) {
    return (
        <Flex width="100%" mb="24px" justifyContent="space-between">
            {search && <Input inputProps={{ onChange: search.onChange, value: search.value, placeholder: search.placeholder ?? "Search" }} icon={<AppIcons.SearchOutlined />} inputGroupProps={{ width: "300px", height: 12, bgColor: "#1C1C1C" }} />}
            {filters && <FiltersDataGrid items={filters} />}
        </Flex>
    )
}

// Content Component
function PageGridContent({ children, loading }: PageGridContentProps) {
    const contextLoading = usePageGridContext().loading
    const isLoading = loading ?? contextLoading

    return (
        <Flex flexDirection="column" borderRadius="8px" width="100%" background="#1C1C1C" align="stretch">
            {isLoading ? <DataGridSkeleton /> : children}
        </Flex>
    )
}

const PageGrid = {
    Root: PageGridRoot,
    Header: PageGridHeader,
    Actions: PageGridActions,
    Content: PageGridContent
}

export default PageGrid