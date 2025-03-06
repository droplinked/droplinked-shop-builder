import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React, { createContext, useContext } from 'react'
import Input from '../input/Input'
import FiltersDataGrid from './components/filters/FiltersDatagrid'
import DataGridSkeleton from './components/skeleton/DatagridSkeleton'
import { PageGridActionsProps, PageGridContentProps, PageGridHeaderProps, PageGridRootProps } from './interface'

// Context - simplified since we're not passing everything through context
const PageGridContext = createContext<{ loading?: boolean }>({})
const usePageGridContext = () => useContext(PageGridContext)

// Root Component - simplified
function PageGridRoot({ children, loading, flexProps }: PageGridRootProps) {
    return (
        <PageGridContext.Provider value={{ loading }}>
            <Flex {...flexProps} width="100%" flexDirection="column" alignItems="start">
                {children}
            </Flex>
        </PageGridContext.Provider>
    )
}

// Header Component
function PageGridHeader({ title, description, rightContent }: PageGridHeaderProps) {
    return (
        <Flex w="full" marginBottom={"36px"} flexDirection={"row"} justifyContent={"space-between"} alignItems={"start"}>
            <Flex flexDirection="column" alignItems="start">
                {title && (
                    <AppTypography color="neutral.white" fontSize="24px" fontWeight={700}>
                        {title}
                    </AppTypography>
                )}
                {description && (
                    <AppTypography color="#b1b1b1" fontSize="16px">
                        {description}
                    </AppTypography>
                )}
            </Flex>
            {rightContent}
        </Flex>
    )
}

// Actions Component
function PageGridActions({ search, filters }: PageGridActionsProps) {
    return (
        <Flex width="100%" mb="24px" justifyContent="space-between">
            {search && (
                <Input
                    inputGroupProps={{ width: "300px" }}
                    inputContainerProps={{ bgColor: "neutral.gray.1000", padding: 3, _hover: search.disabled ? {} : { borderColor: "neutral.gray.700" } }}
                    inputProps={{
                        fontSize: 16,
                        placeholder: search.placeholder ?? "Search",
                        value: search.value,
                        onChange: search.onChange,
                        isDisabled: search.disabled
                    }}
                    leftElement={<AppIcons.SearchOutlined />}
                />
            )}
            {filters && <FiltersDataGrid items={filters} />}
        </Flex>
    )
}

// Content Component
function PageGridContent({ children, loading }: PageGridContentProps) {
    const contextLoading = usePageGridContext().loading
    const isLoading = loading ?? contextLoading

    return (
        <Flex w="full" flexDirection="column">
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