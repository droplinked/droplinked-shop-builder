import { Flex } from '@chakra-ui/react';
import { SearchMd } from 'assets/icons/System/Search/SearchMd';
import AppSkeleton from 'components/common/skeleton/AppSkeleton';
import Input from 'components/redesign/input/Input';
import SelectMenu from 'components/redesign/select-menu/SelectMenu';
import { ordersStatuesServices } from 'lib/apis/orders/orderServices';
import React from 'react';
import { useQuery } from 'react-query';

interface Props {
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    selectValue?: string | null;
}

export default function FilterInputs({ onSearchChange, onStatusChange, selectValue }: Props) {
    const { isFetching, data } = useQuery({
        queryKey: ["orders-statues"],
        queryFn: () => ordersStatuesServices(),
        select(data) {
            return data.data.data
        },
    });

    return (
        <Flex alignItems="center" justifyContent="space-between" flexDirection={{ base: "column", md: "row" }} >
            <Input
                leftElement={<SearchMd color='#7b7b7b' />}
                inputGroupProps={{
                    width: { base: "100%", md: "auto" },
                }}
                inputProps={{
                    placeholder: "Search Products...",
                    onChange: (e) => onSearchChange(e.target.value),
                }}
            />
            <AppSkeleton borderRadius={8} isLoaded={!isFetching}>
                <SelectMenu
                    items={isFetching ?
                        [] :
                        data?.map((item) => ({ label: item.caption, value: item.value }))
                    }
                    placeholder='Status'
                    onChange={(value: string) => onStatusChange(value)}
                />
            </AppSkeleton>
        </Flex>
    )
}
