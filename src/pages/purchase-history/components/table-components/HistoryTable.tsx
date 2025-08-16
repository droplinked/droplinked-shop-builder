import { Flex, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { UseInfiniteQueryResult } from 'react-query'
import FilterInputs from '../FilterInputs'
import DesktopTable from './DesktopTable'
import MobileTable from './MobileTable'

interface Props {
    onSearchChange?: (value: string) => void // Made optional
    onStatusChange: (value: string) => void
    searchValue?: string
    statusValue?: string
    purchaseHistoryQuery: UseInfiniteQueryResult<any, unknown>
}

/**
    * HistoryTable component displays a table of purchase history with filter inputs
    * @param onSearchChange - Function to handle search input changes (currently commented out)
    * @param onStatusChange - Function to handle status filter changes
    * @param searchValue - Current value of the search input (currently not used)
    * @param statusValue - Current value of the status filter
    * @param purchaseHistoryQuery - Query result for fetching purchase history
 */

export default function HistoryTable({ onStatusChange, onSearchChange, searchValue, statusValue, purchaseHistoryQuery, }: Props) {
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} width="100%">
            <FilterInputs
                onStatusChange={onStatusChange}
                selectValue={statusValue}
                // Search functionality commented out but props kept for future use
                onSearchChange={onSearchChange}
                searchValue={searchValue}
            />

            {isSmallerThan768
                ? <MobileTable purchaseHistoryQuery={purchaseHistoryQuery} />
                : <DesktopTable purchaseHistoryQuery={purchaseHistoryQuery} />
            }
        </Flex>
    )
}
