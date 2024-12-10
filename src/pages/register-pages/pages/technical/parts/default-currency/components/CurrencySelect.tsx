import Select from "components/redesign/select/Select";
import * as React from 'react';

export const CurrencySelect = ({ isLoading, shopInfoLoading, currencyAbbreviation, updateState, currencyData }) => (
    <Select
        isLoading={isLoading || shopInfoLoading}
        value={{ title: currencyAbbreviation, value: currencyAbbreviation }}
        onChange={(value: { title: string, value: string }) => updateState("currencyAbbreviation", value.value)}
        selectProps={{ width: "50%", isDisabled: isLoading || shopInfoLoading }}
        valueAccessor="value"
        labelAccessor="title"
        items={currencyData.map((item) => ({ title: item, value: item }))}
    />
);