import { Box } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import React from "react"
import Select from "react-select"

/**
 * Multi-select dropdown component with custom styling
 *  
 * @param {object} props - Component props
 * @param {Array<any>} props.options - Array of options to select from (strings or objects)
 * @param {Array<any>} props.value - Array of currently selected values
 * @param {function} props.onChange - Function called with the updated array when selection changes
 * @param {string} [props.labelAccessor="label"] - Object property to use as display text for options
 * @param {string} [props.placeholder="Select..."] - Placeholder text when no options are selected
 * 
 * @returns {JSX.Element} Multi-select dropdown component
 */
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
            border: '1px solid',
            borderColor:'neutral.gray.800',
            borderRadius: '8px',
            padding: '8px',
            backgroundColor: "transparent",
            color: "#FFF",
            boxShadow: "none",
            userSelect: "none",
            transition: "border-color 0.1s ease-out",
            "&:hover": { borderColor: "neutral.gray.700" },
            '&:focus': { boxShadow: 'none', borderColor: 'neutral.gray.700' },
            "&:focus-within": { boxShadow: "none" },
        }),
        valueContainer: (base) => ({ ...base, gap: "8px", padding: 0 }),
        multiValue: () => ({
            display: "flex",
            alignItems: "center",
            gap: "6px",
            borderRadius: '4px',
            padding: '8px 12px',
            backgroundColor: 'neutral.gray.800',
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
            color: 'neutral.gray.800',
            '&:hover': { color: 'neutral.gray.800' },
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
            "&:hover": { backgroundColor: "neutral.gray.800" },
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