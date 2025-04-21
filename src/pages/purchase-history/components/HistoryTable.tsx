import React from 'react';
import FilterInputs from './FilterInputs';
import { Flex, useMediaQuery } from '@chakra-ui/react';
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';
import { UseInfiniteQueryResult } from 'react-query';

interface Props {
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    searchValue?: string;
    statusValue?: string;
    purchaseHistoryQuery: UseInfiniteQueryResult<any, unknown>;
}

export default function HistoryTable({ onStatusChange, onSearchChange, searchValue, statusValue, purchaseHistoryQuery, }: Props) {
    const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')

    return (
        <Flex flexDirection="column" gap={{ base: 4, md: 6 }} width="100%">
            <FilterInputs
                onSearchChange={onSearchChange}
                onStatusChange={onStatusChange}
                searchValue={searchValue}
                selectValue={statusValue}
            />

            {isSmallerThan768 ?
                <MobileTable purchaseHistoryQuery={purchaseHistoryQuery} /> :
                <DesktopTable purchaseHistoryQuery={purchaseHistoryQuery} />
            }
        </Flex>
    )
}
