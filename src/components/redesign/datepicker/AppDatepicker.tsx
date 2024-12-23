import { HStack } from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.scss";
import { CustomTimeInput } from "./components/CustomTimeInput";
import CustomHeader from "./components/CustomHeader";
import AppIcons from "assest/icon/Appicons";

interface IProps {
    value?: Date;
    endDate?: Date;
    onChange: any;
    minDate?: Date;
    className?: any;
    inline?: boolean;
    selectsRange?: boolean;
    placeholderText?: string;
    showTimeInput?: boolean;
}

function AppDatepicker({
    onChange,
    value,
    minDate,
    placeholderText,
    inline,
    className,
    endDate,
    selectsRange,
    showTimeInput,
}: IProps) {

    return (
        <HStack
            alignItems={"center"}
            className={`${classes.datepicker} ${className || ""}`}
            border={"1px solid #292929"}
            _hover={{ border: "1px solid #3C3C3C" }}
            width={"210px"}
            borderRadius={"8px"}
            px={2}
            py={1}
        >
            <DatePicker
                {...(typeof endDate && { endDate })}
                {...(selectsRange && { selectsRange: true })}
                selected={value}
                dateFormat="d MMM, yyyy - HH:mm"
                {...(showTimeInput && { showTimeInput: true })}
                inline={inline}
                placeholderText={placeholderText}
                {...(minDate && { minDate })}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(date) => {
                    onChange(date);
                }}
                className={classes.input}
                timeInputLabel=""
                customTimeInput={<CustomTimeInput />}
                autoFocus={false}
                focusSelectedMonth={false}
                disabledKeyboardNavigation={true}
                shouldCloseOnSelect={false}
                renderCustomHeader={(props) => (<CustomHeader {...props} />)}
                icon={<AppIcons.Calendar style={{ marginRight: "8px" }} />}
                showIcon
            />
        </HStack>
    );
}

export default AppDatepicker;
