import { SelectProps } from "@chakra-ui/react"
import React from 'react'
import { useQuery } from "react-query"
import { getCurrencyList } from "services/shop/shopServices"
import AppSelect from "./AppSelect"

/**
 * CurrencySelect Component - Currency selection dropdown
 * 
 * Fetches currency options from the API and displays them in a select dropdown.
 * Handles loading states and defaults to USD if no value is provided.
 * 
 * @param {object} props - Component props
 * @param {string} [props.value] - Currently selected currency code
 * @param {boolean} [props.isDisabled] - Whether the select is disabled
 * @param {SelectProps} props - Additional Chakra UI SelectProps
 */
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