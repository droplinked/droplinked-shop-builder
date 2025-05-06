import { SelectProps } from "@chakra-ui/react"
import AppSelect from "./AppSelect"
import { getCurrencyList } from "lib/apis/shop/shopServices"
import React from 'react'
import { useQuery } from "react-query"

function CurrencySelect(props: SelectProps) {
    const { isLoading, data } = useQuery({
        queryKey: ["currency-list"],
        queryFn: () => getCurrencyList()
    })

    const currencyList = data?.data || []

    return (
        <AppSelect
            isLoading={isLoading}
            selectProps={{
                ...props,
                isDisabled: isLoading || props.isDisabled,
                value: props.value || "USD"
            }}
            items={currencyList}
        />
    )
}

export default CurrencySelect