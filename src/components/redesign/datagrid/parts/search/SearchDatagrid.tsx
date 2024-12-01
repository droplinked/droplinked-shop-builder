import { Image, Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react'
import React from 'react'
import searchIcon from "assest/icon/search-icon.svg";
import AppIcons from 'assest/icon/Appicons';

export interface ISearchDatagrid {
    onChange(e: any): void
    value?: string
}

function SearchDatagrid({ onChange, value }: ISearchDatagrid) {
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

export default SearchDatagrid