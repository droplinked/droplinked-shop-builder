import { Box } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomHeader from "./components/CustomHeader"
import { CustomTimeInput } from "./components/CustomTimeInput"
import classes from "./styles.module.scss"

/**
 * AppDatePicker Component - Styled date and time selection control
 * 
 * Wraps react-datepicker with custom styling and additional features like
 * time selection, date ranges, and custom header components.
 * 
 * @param {object} props - Component props
 * @param {Date} [props.value] - Currently selected date value
 * @param {Date} [props.endDate] - End date for range selection
 * @param {Function} props.onChange - Callback when date selection changes
 * @param {Date} [props.minDate] - Minimum selectable date
 * @param {boolean} [props.inline] - Whether to display as inline calendar
 * @param {boolean} [props.selectsRange] - Whether to enable date range selection
 * @param {string} [props.placeholderText] - Placeholder text when no date is selected
 * @param {boolean} [props.showTimeInput] - Whether to show time selection input
 * @param {string} [props.dateFormat] - Format string for date display
 */
interface Props {
    value?: Date
    endDate?: Date
    onChange: any
    minDate?: Date
    inline?: boolean
    selectsRange?: boolean
    placeholderText?: string
    showTimeInput?: boolean
    dateFormat?: string
}

function AppDatePicker({
    onChange,
    value,
    minDate,
    placeholderText,
    inline,
    endDate,
    selectsRange,
    showTimeInput,
    dateFormat
}: Props) {

    return (
        <Box
            className={classes.datepicker}
            width="210px"
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={8}
            px={2}
            py={1}
            transition="border-color 0.1s ease-out"
            _hover={{ borderColor: "neutral.gray.700" }}
        >
            <DatePicker
                className={classes.input}
                {...(typeof endDate && { endDate })}
                {...(selectsRange && { selectsRange: true })}
                selected={value}
                dateFormat={dateFormat ? dateFormat : "d MMM, yyyy - HH:mm"}
                {...(showTimeInput && { showTimeInput: true })}
                inline={inline}
                placeholderText={placeholderText}
                {...(minDate && { minDate })}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(date) => onChange(date)}
                timeInputLabel=""
                customTimeInput={<CustomTimeInput />}
                autoFocus={false}
                focusSelectedMonth={false}
                disabledKeyboardNavigation={true}
                shouldCloseOnSelect={false}
                renderCustomHeader={(props) => <CustomHeader {...props} />}
                icon={<AppIcons.Calendar />}
                showIcon
            />
        </Box>
    )
}

export default AppDatePicker