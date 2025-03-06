import { Select as ChakraSelect } from "@chakra-ui/react";
import AppIcons from "assets/icon/Appicons";
import React from 'react';

interface Props {
    items: { title: string, value: number }[],
    selectedItem: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select({ items, selectedItem, onChange }: Props) {
    return (
        <ChakraSelect
            height={"50px"}
            borderColor={"neutral.gray.100"}
            _hover={{}}
            icon={<AppIcons.BlackChevronDown />}
            defaultValue={selectedItem}
            onChange={onChange}
        >
            {items.map(item => <option key={item.title} value={item.value}>{item.title}</option>)}
        </ChakraSelect>
    )
}

export default Select