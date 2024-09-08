import { Select as ChakraSelect, FormLabel, InputGroup, InputGroupProps, SelectProps } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React, { useMemo } from 'react';

interface SelectItem<T> {
    title: string;
    value: T;
}

interface Props<T> {
    items: SelectItem<T>[];
    label?: string;
    inputGroupProps?: InputGroupProps;
    selectProps?: SelectProps;
    isLoading?: boolean;
}

function Select<T extends string | number>({ items, label, inputGroupProps, selectProps, isLoading }: Props<T>) {
    const options = useMemo(() => {
        return items.map((item) => (
            <option key={item.value} value={item.value}>
                {item.title}
            </option>
        ))
    }, [items])

    const selectElement = (
        <ChakraSelect
            height={12}
            border={"1px solid #292929"}
            borderWidth={"1.5px"}
            borderRadius={8}
            color={"#7B7B7B"}
            icon={< AppIcons.SelectChevronDown />}
            _placeholder={{ color: "#7B7B7B" }}
            _hover={{}}
            _focus={{}}
            _focusVisible={{}}
            {...selectProps}
        >
            {options}
        </ChakraSelect>
    )

    if (!label) return selectElement

    return (
        <InputGroup
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            {...inputGroupProps}
        >
            <FormLabel width={"fit-content"} m={0} fontSize={14} fontWeight={500} color="white">{label}</FormLabel>
            {selectElement}
        </InputGroup>
    )
}

export default Select