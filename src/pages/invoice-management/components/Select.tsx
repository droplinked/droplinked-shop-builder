import { Select as ChakraSelect, FormLabel, InputGroup, InputGroupProps, SelectProps, Spinner } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useMemo } from 'react';

interface Props {
    label?: string;
    items: any[];
    value?: any;
    labelAccessor?: string;
    valueAccessor?: string;
    isLoading?: boolean;
    error?: string;
    inputGroupProps?: InputGroupProps;
    selectProps?: SelectProps;
}

function Select({ label, items, value, labelAccessor = "name", valueAccessor = "id", isLoading, error, inputGroupProps, selectProps }: Props) {
    const options = useMemo(() => {
        return items.map((item) => (
            <option key={item[valueAccessor]} value={item[valueAccessor]}>
                {item[labelAccessor]}
            </option>
        ))
    }, [items])

    const selectElement = (
        <ChakraSelect
            value={value}
            height={12}
            border={"1px solid #292929"}
            borderWidth={"1.5px"}
            borderRadius={8}
            color={"#7B7B7B"}
            icon={isLoading ? <Spinner size={"sm"} color='#7B7B7B' /> : <AppIcons.SelectChevronDown />}
            _placeholder={{ color: "#7B7B7B" }}
            _hover={{}}
            _focus={{}}
            _focusVisible={{}}
            {...selectProps}
        >
            {options}
        </ChakraSelect>
    )

    if (!label) return (
        <>
            {selectElement}
            {error && <AppTypography mt={2} fontSize={14} color={"#E53E3E"}>{error}</AppTypography>}
        </>
    )

    return (
        <InputGroup
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            {...inputGroupProps}
        >
            <FormLabel width={"fit-content"} m={0} fontSize={14} fontWeight={500} color="white">{label}</FormLabel>
            {selectElement}
            {error && <AppTypography fontSize={14} color={"#E53E3E"}>{error}</AppTypography>}
        </InputGroup>
    )
}

export default Select