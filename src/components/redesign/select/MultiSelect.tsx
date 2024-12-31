import { Box } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import React from "react"
import Select from "react-select"

function MultiSelect({ value, options, labelAccessor = "label", placeholder = "Select...", onChange }) {
    function getFormattedOptions(options = []) {
        return options.map(option => ({
            label: typeof option === "object" ? option[labelAccessor] : option,
            value: option
        }))
    }

    function getFilteredOptions() {
        const formattedOptions = getFormattedOptions(options)
        return formattedOptions.filter(option =>
            !value.some(selected =>
                typeof selected === "object"
                    ? selected[labelAccessor] === option.label
                    : selected === option.label
            )
        )
    }

    function handleSelect(selected) {
        const result = selected?.map(s => s.value) || []
        onChange?.(result)
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            outline: 'none',
            border: '1px solid #292929',
            borderRadius: '8px',
            padding: '8px',
            backgroundColor: "transparent",
            color: "#FFF",
            boxShadow: "none",
            userSelect: "none",
            transition: "border-color 0.1s ease-out",
            "&:hover": { borderColor: "#3C3C3C" },
            '&:focus': { boxShadow: 'none', borderColor: '#3C3C3C' },
            "&:focus-within": { boxShadow: "none" },
        }),
        valueContainer: (base) => ({ ...base, gap: "8px", padding: 0 }),
        multiValue: () => ({
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderRadius: '4px',
            padding: '8px 12px',
            backgroundColor: '#292929',
            color: '#FFF'
        }),
        multiValueLabel: () => ({
            padding: 0,
            color: '#FFF',
            fontSize: '14px',
        }),
        multiValueRemove: base => ({
            ...base,
            cursor: "pointer",
            "&:hover": { backgroundColor: "transparent" }
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#292929',
            '&:hover': { color: '#292929' },
        }),
        clearIndicator: () => ({ display: 'none' }),
        indicatorSeparator: () => ({ display: 'none' }),
        input: (base) => ({ ...base, padding: 0, fontSize: '14px', color: '#FFF' }),
        placeholder: (base) => ({ ...base, fontSize: '14px', color: '#7B7B7B', }),
        menu: base => ({
            ...base,
            borderRadius: "8px",
            padding: "8px",
            backgroundColor: "#222",
            zIndex: 999,
            userSelect: "none"
        }),
        option: (base, state) => ({
            ...base,
            margin: 0,
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: "transparent",
            color: "#FFF",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#292929" },
        }),
        noOptionsMessage: base => ({ ...base, padding: 0, color: '#FFF' })
    }

    const customComponents = {
        MultiValueRemove: props => (
            <Box {...props.innerProps}>
                <AppIcons.Close />
            </Box>
        ),
        DropdownIndicator: () => <AppIcons.SelectChevronDown />
    }

    return (
        <Select
            value={getFormattedOptions(value)}
            options={getFilteredOptions()}
            isMulti
            placeholder={placeholder}
            onChange={handleSelect}
            styles={customStyles}
            components={customComponents}
        />
    )
}

export default MultiSelect