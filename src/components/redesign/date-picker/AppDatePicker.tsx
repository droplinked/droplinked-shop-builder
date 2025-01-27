import { Box } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import CustomHeader from "./components/CustomHeader"
import { CustomTimeInput } from "./components/CustomTimeInput"
import classes from "./styles.module.scss"

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
            border="1px solid #292929"
            borderRadius={8}
            px={2}
            py={1}
            transition="border-color 0.1s ease-out"
            _hover={{ borderColor: "#3C3C3C" }}
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