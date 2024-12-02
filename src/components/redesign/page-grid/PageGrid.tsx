import { Flex, HStack, VStack } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'
import DataGridButtons, { IDataGridButtons } from './components/buttons/DatagridButtons'
import FiltersDataGrid, { IFiltersDataGridItems } from './components/filters/FiltersDatagrid'
import DataGridSkeleton from './components/skeleton/DatagridSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import Input from './components/input/Input'
import AppIcons from 'assest/icon/Appicons'


interface SearchInput {
    onChange(e: any): void
    value?: string
    placeholder?: string
}

export interface IdataGrid extends IDataGridButtons {
    filters?: Array<IFiltersDataGridItems>
    loading: boolean
    search?: SearchInput
    description?: string
    title?: string
}

// Context - simplified since we're not passing everything through context
const PageGridContext = createContext<{ loading?: boolean }>({})
const usePageGridContext = () => useContext(PageGridContext)

// Root Component - simplified
function PageGridRoot({ children, loading }: { children: React.ReactNode; loading?: boolean }) {
    return (
        <PageGridContext.Provider value={{ loading }}>
            <VStack width={"100%"} alignItems={"start"}>
                {children}
            </VStack>
        </PageGridContext.Provider>
    )
}

// Header Component
function PageGridHeader({
    title,
    description,
    buttons
}: {
    title?: string,
    description?: string,
    buttons?: IDataGridButtons['buttons']
}) {
    return (
        <HStack mb={"36px"} alignItems={"start"} justifyContent={"space-between"} width={"100%"}>
            <VStack alignItems={"start"}>
                {title && (
                    <AppTypography color={"#fff"} fontSize={"24px"} fontWeight={700}>
                        {title}
                    </AppTypography>
                )}
                {description && (
                    <AppTypography color={"#b1b1b1"} fontSize={"16px"}>
                        {description}
                    </AppTypography>
                )}
            </VStack>
            {buttons && <DataGridButtons buttons={buttons} />}
        </HStack>
    )
}

// Actions Component
function PageGridActions({
    search,
    filters
}: {
    search?: SearchInput,
    filters?: Array<IFiltersDataGridItems>
}) {
    return (
        <Flex mb={"24px"} justifyContent={"space-between"} width={"100%"}>
            {search && <Input inputProps={{ onChange: search.onChange, value: search.value, placeholder: search.placeholder ?? "Search" }} icon={<AppIcons.SearchOutlined />} inputGroupProps={{ width: "300px", height: 12, bgColor: "#1C1C1C" }} />}
            {filters && <FiltersDataGrid items={filters} />}
        </Flex>
    )
}

// Content Component
function PageGridContent({
    children,
    loading
}: {
    children: React.ReactNode
    loading?: boolean
}) {
    const contextLoading = usePageGridContext().loading
    const isLoading = loading ?? contextLoading

    return (
        <VStack borderRadius={"8px"} width={"100%"} background={"#1C1C1C"} align={"stretch"} spacing={6}>
            {isLoading ? <DataGridSkeleton /> : children}
        </VStack>
    )
}

// Compound Component
const PageGrid = {
    Root: PageGridRoot,
    Header: PageGridHeader,
    Actions: PageGridActions,
    Content: PageGridContent
}

export default PageGrid