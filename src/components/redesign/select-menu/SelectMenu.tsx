import { useMediaQuery } from '@chakra-ui/react'
import React from "react"
import SelectMenuDesktop from './desktop/SelectMenuDesktop'
import SelectMenuMobile from './mobile/SelectMenuMobile'
import { SelectMenuProps } from './types'

/**
 * @component SelectMenu
 * @description A responsive select menu component that renders either desktop or mobile version based on screen size.
 * The component supports single or multiple selection with optional checkboxes and custom placeholder text.
 * 
 * @example
 * ```tsx
 * <SelectMenu
 *   items={[
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2", labelDescription: "Description" }
 *   ]}
 *   showCheckbox={true}
 *   multiple={true}
 *   onChange={(value) => console.log(value)}
 *   placeholder="Select options"
 * />
 * ```
 * 
 * @param {SelectMenuProps} props - The component props
 * @param {SelectItem[]} props.items - Array of select options with label and value
 * @param {boolean} [props.showCheckbox=false] - Whether to show checkboxes next to options
 * @param {boolean} [props.multiple=false] - Whether multiple selection is allowed
 * @param {string|string[]|null} [props.value] - Currently selected value(s)
 * @param {function} [props.onChange] - Callback function called when selection changes
 * @param {string} [props.placeholder="Select"] - Placeholder text when no option is selected
 * @param {React.ReactNode} [props.mobileModeIcon] - Custom icon for mobile mode button
 * 
 * @returns {React.ReactElement} The SelectMenu component
 */
export default function SelectMenu({
    items,
    showCheckbox = false,
    multiple = false,
    value = multiple ? [] : null,
    onChange,
    placeholder = "Select",
    mobileModeIcon,
    fullWidth = false
}: SelectMenuProps) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    if (isSmallerThan768) {
        return <SelectMenuMobile
            items={items}
            showCheckbox={showCheckbox}
            multiple={multiple}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            mobileModeIcon={mobileModeIcon}
            fullWidth={fullWidth}
        />
    }

    return (
        <SelectMenuDesktop
            items={items}
            showCheckbox={showCheckbox}
            multiple={multiple}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth={fullWidth}
        />
    )
}
