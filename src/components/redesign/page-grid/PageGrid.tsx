/**
 * @fileoverview PageGrid is a compound component that provides a structured layout 
 * for pages with standardized header, actions, and content areas.
 * 
 * The component follows a compound component pattern with four main parts:
 * - Root: The container that provides context and structure
 * - Header: Displays title, description, and action buttons with responsive behavior
 * - Actions: Contains search and filter functionality
 * - Content: The main content area with loading state handling
 * 
 * @example
 * ```tsx
 * <PageGrid.Root>
 *   <PageGrid.Header 
 *     title="Dashboard" 
 *     description="Overview of your activities"
 *     actionButtons={[{ title: "Add New", onClick: () => {}, variant: "primary" }]}
 *   />
 *   <PageGrid.Actions
 *     search={{ onChange: (e) => {}, placeholder: "Search..." }}
 *     filters={[{ placeHolder: "Status", onClick: () => {}, filterItems: [...] }]}
 *   />
 *   <PageGrid.Content>
 *     <YourContentComponent />
 *   </PageGrid.Content>
 * </PageGrid.Root>
 * ```
 */

import { Flex, Text, useMediaQuery } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import React, { createContext, useContext } from 'react'
import AppInput from '../input/AppInput'
import DesktopActionButtons from './components/DesktopActionButtons'
import MobileFloatingMenu from './components/MobileFloatingMenu'
import FiltersDataGrid from './components/filters/FiltersDatagrid'
import DataGridSkeleton from './components/skeleton/DatagridSkeleton'
import { PageGridActionsProps, PageGridContentProps, PageGridHeaderProps, PageGridRootProps } from './interface'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

/**
 * Context to share loading state across PageGrid components
 */
const PageGridContext = createContext<{ loading?: boolean }>({})
const usePageGridContext = () => useContext(PageGridContext)

/**
 * Root component that provides structure and context for the PageGrid
 * 
 * @param props - Component props
 * @param props.children - Child components to render inside the PageGrid
 * @param props.loading - Optional loading state that will be passed to the Content component
 */
function PageGridRoot({ children, loading }: PageGridRootProps) {
    return (
        <PageGridContext.Provider value={{ loading }}>
            <Flex width="100%" flexDirection="column" alignItems="start">
                {children}
            </Flex>
        </PageGridContext.Provider>
    )
}

/**
 * Header component that displays title, description, and action buttons
 * Handles responsive behavior: desktop shows buttons inline, mobile shows a floating action menu
 * 
 * @param props - Component props
 * @param props.title - Optional title text
 * @param props.description - Optional description text
 * @param props.actionButtons - Optional array of action button configurations
 */
function PageGridHeader({ title, description, actionButtons }: PageGridHeaderProps) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    return (
        <Flex width="100%" justifyContent="space-between" marginBottom="36px">
            <Flex flexDirection="column" gap={1}>
                {title && (
                    <Text color="neutral.white" fontSize="24px" fontWeight={700}>
                        {title}
                    </Text>
                )}
                {description && <Text color="text.subtext.placeholder.light">{description}</Text>}
            </Flex>
            {isSmallerThan768
                ? <MobileFloatingMenu actionButtons={actionButtons} />
                : <DesktopActionButtons actionButtons={actionButtons} />
            }
        </Flex>
    )
}

/**
 * Actions component for search and filtering functionality
 * 
 * @param props - Component props
 * @param props.search - Optional configuration for search input
 * @param props.filters - Optional array of filter configurations
 */
function PageGridActions({ search, filters }: PageGridActionsProps) {
    const { t } = useLocaleResources('common')
    return (
        <Flex width="100%" mb="24px" justifyContent="space-between">
            {search && (
                <AppInput
                    inputGroupProps={{ width: "300px" }}
                    inputContainerProps={{ bgColor: "neutral.gray.1000", padding: 3, _hover: search.disabled ? {} : { borderColor: "neutral.gray.700" } }}
                    inputProps={{
                        fontSize: 16,
                        placeholder: search.placeholder ? search.placeholder : t('search'),
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

/**
 * Content component that displays the main content with loading state handling
 * Will show a skeleton loading state when loading is true
 * 
 * @param props - Component props
 * @param props.children - Content to render
 * @param props.loading - Optional loading state that overrides the context loading state
 */
function PageGridContent({ children, loading }: PageGridContentProps) {
    const { loading: contextLoading } = usePageGridContext()
    const isLoading = loading ?? contextLoading

    return (
        <Flex w="full" flexDirection="column">
            {isLoading ? <DataGridSkeleton /> : children}
        </Flex>
    )
}

/**
 * PageGrid compound component
 * A versatile layout component for creating structured pages with consistent styling
 */
const PageGrid = {
    Root: PageGridRoot,
    Header: PageGridHeader,
    Actions: PageGridActions,
    Content: PageGridContent
}

export default PageGrid