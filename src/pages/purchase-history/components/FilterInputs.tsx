import { Flex } from '@chakra-ui/react';
import { FilterMd } from 'assets/icons/Action/Filter/FilterMd';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import { ordersStatuesServices } from 'lib/apis/orders/orderServices';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {
    onSearchChange?: (value: string) => void;
    onStatusChange: (value: string) => void;
    selectValue?: string;
    searchValue?: string;
}

export default function FilterInputs({ onSearchChange, onStatusChange, selectValue, searchValue }: Props) {
    const { isFetching, data } = useQuery({
        queryKey: ["orders-statues"],
        queryFn: () => ordersStatuesServices(),
        select(data) {
            return data.data.data
        },
    });

    return (
        <Flex alignItems="center" justifyContent="space-between" gap={{ base: 4, md: 0 }}>
            {/* Search functionality commented out
            <AppInput
                leftElement={<SearchMd color='#7b7b7b' />}
                inputGroupProps={{
                    width: { base: "100%", md: "auto" },
                }}
                inputContainerProps={{
                    padding: { base: "10px 16px", md: "12px 16px" },
                }}
                inputProps={{
                    placeholder: "Search Products...",
                    onChange: (e) => onSearchChange(e.target.value),
                    value: searchValue,
                }}
            />
            */}
            <AppSkeleton borderRadius={8} ml="auto" isLoaded={!isFetching}>
                <SelectMenu
                    items={isFetching ?
                        [] :
                        data?.map((item) => ({ label: item.caption, value: item.value }))
                    }
                    placeholder='Status'
                    onChange={(value: string) => onStatusChange(value)}
                    mobileModeIcon={<FilterMd color='#fff' />}
                    value={selectValue}
                    showCheckbox
                />
            </AppSkeleton>
        </Flex>
    )
}
