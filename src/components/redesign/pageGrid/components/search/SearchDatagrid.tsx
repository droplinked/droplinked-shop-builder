import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import React from 'react';

export interface ISearchDataGrid {
    onChange(e: any): void
    value?: string
}

function SearchDataGrid({ onChange, value }: ISearchDataGrid) {
    return (
        <InputGroup w="288px">
            <InputLeftElement
                pointerEvents="none"
                children={<AppIcons.SearchOutlined />}
            />
            <Input
                p="8px 40px"
                borderRadius="8px"
                value={value}
                border="1px solid #292929"
                borderColor="line"
                _placeholder={{ color: "#7B7B7B", opacity: "1" }}
                _hover={{ borderColor: "none" }}
                _focus={{ borderColor: "none" }}
                fontFamily="Avenir Next"
                fontWeight="400"
                fontSize="14px"
                color="#7B7B7B"
                background={"#1C1C1C"}
                placeholder="Search"
                onChange={onChange}
            />
        </InputGroup>
    )
}

export default SearchDataGrid