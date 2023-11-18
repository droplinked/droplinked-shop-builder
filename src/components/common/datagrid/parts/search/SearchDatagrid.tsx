import { Image, Input, InputGroup, InputLeftElement, InputProps } from '@chakra-ui/react'
import React from 'react'
import searchIcon from "assest/icon/search-icon.svg";

export interface ISearchDatagrid {
    onChange(e: any): void
    value?: string
}

function SearchDatagrid({ onChange, value }: ISearchDatagrid) {    
    return (
        <InputGroup w="200px">
            <InputLeftElement
                pointerEvents="none"
                children={<Image src={searchIcon} h="16px" w="16px" />}
            />
            <Input
                p="8px 36px"
                borderRadius="24px"
                value={value}
                border="1px solid"
                borderColor="line"
                _placeholder={{ color: "#C2C2C2", opacity: "1" }}
                _hover={{ borderColor: "none" }}
                _focus={{ borderColor: "none" }}
                fontFamily="Avenir Next"
                fontWeight="400"
                fontSize="12px"
                color="#C2C2C2"
                placeholder="Search"
                onChange={onChange}
            />
        </InputGroup>
    )
}

export default SearchDatagrid