import { Flex } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import MultiSelectMenu from '../multi-select-menu/MultiSelectMenu'
import ResponsiveTable from './ResponsiveTable'
import { useQuery } from 'react-query'
import { getAvailableFilterTypes } from 'services/credit/services'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'

export default function TransactionsTable() {
    const { isFetching, data } = useQuery({
        queryKey: ["get-creditsAndActivity-filters"],
        queryFn: () => getAvailableFilterTypes(),
    })
    const { types } = data?.data?.data ?? {}

    const filterItems = useMemo(() => {
        return (types ?? []).map(type => ({
            label: type,
            value: type
        }))
    }, [types])

    return (
        <Flex mt={6} flexDirection="column" gap={4}>
            <Flex
                justifyContent="flex-end"
                alignItems="center"
                gap={3}
                flexDirection={{ base: "column", md: "row" }}
            >
                <AppSkeleton
                    width={{ base: "100%", md: "150px" }}
                    borderRadius={8}
                    isLoaded={!isFetching}
                >
                    <MultiSelectMenu filterItems={filterItems} />
                </AppSkeleton>
            </Flex>
            <ResponsiveTable />
        </Flex>
    )
}
