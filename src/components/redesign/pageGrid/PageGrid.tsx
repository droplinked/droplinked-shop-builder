import { Flex, HStack, VStack } from '@chakra-ui/react'
import React, { createContext, useContext } from 'react'
import DatagridButtons, { IDatagridButtons } from './components/buttons/DatagridButtons'
import FiltersDatagrid, { IFiltersDatagridItems } from './components/filters/FiltersDatagrid'
import { IPagination } from './components/pagination/Pagination'
import SearchDatagrid, { ISearchDatagrid } from './components/search/SearchDatagrid'
import DatagridSkeleton from './components/skeleton/DatagridSkeleton'
import AppTypography from 'components/common/typography/AppTypography'

type mergeType = IDatagridButtons

export interface IdataGrid extends mergeType {
    filters?: Array<IFiltersDatagridItems>
    loading: boolean
    search?: ISearchDatagrid
    pagination?: IPagination
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
    buttons?: IDatagridButtons['buttons']
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
            {buttons && <DatagridButtons buttons={buttons} />}
        </HStack>
    )
}

// Actions Component
function PageGridActions({
    search,
    filters
}: {
    search?: ISearchDatagrid,
    filters?: Array<IFiltersDatagridItems>
}) {
    return (
        <Flex mb={"24px"} justifyContent={"space-between"}>
            <HStack spacing={8}>
                {search && <SearchDatagrid onChange={search.onChange} value={search.value} />}
                {filters && <FiltersDatagrid item={filters} />}
            </HStack>
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
            {isLoading ? <DatagridSkeleton /> : children}
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