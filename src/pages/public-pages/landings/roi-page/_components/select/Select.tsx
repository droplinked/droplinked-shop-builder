import { Select as ChakraSelect } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import React from 'react';

interface Props {
    placeholder: string;
    items: { title: string, value: number }[],
    setter: React.Dispatch<React.SetStateAction<number>>
}

function Select({ placeholder, items, setter }: Props) {
    return (
        <ChakraSelect
            height={"50px"}
            borderColor={"#F2F2F2"}
            placeholder={placeholder}
            icon={<AppIcons.BlackChevronDown />}
            _hover={{}}
            onChange={(e) => setter(+e.target.value)}
        >
            {items.map(item => <option key={item.title} value={item.value}>{item.title}</option>)}
        </ChakraSelect>
    )
}

export default Select