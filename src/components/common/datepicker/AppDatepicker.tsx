import { VStack, Flex } from "@chakra-ui/react";
import React from "react";
import FieldLabel from "../form/fieldLabel/FieldLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.scss";
import { ExampleCustomTimeInput } from "./components/CustomTimeInput";
import CustomHeader from "./components/CustomHeader";
import AppIcons from "assets/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";

interface IProps {
    value?: Date;
    endDate?: Date;
    onChange: any;
    label?: string;
    minDate?: Date;
    className?: any;
    inline?: boolean;
    selectsRange?: boolean;
    placeholderText?: string;
    showTimeInput?: boolean;
    dateFormat?: string;
}

function AppDatepicker({
    onChange,
    value,
    label,
    minDate,
    placeholderText,
    inline,
    className,
    endDate,
    selectsRange,
    showTimeInput,
    dateFormat = "d MMM, yyyy - HH:mm",
}: IProps) {

    const formatDisplayDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day} ${month}, ${year} - ${hours}:${minutes}`;
    };

    return (
        <VStack
            align="stretch"
            className={`${classes.datepicker} ${className || ""}`}
        >
            {label && <FieldLabel label={label} />}
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
                customTimeInput={<ExampleCustomTimeInput />}
                autoFocus={false}
                focusSelectedMonth={false}
                disabledKeyboardNavigation={true}
                shouldCloseOnSelect={false}
                renderCustomHeader={(props) => (<CustomHeader {...props} />)}
                customInput={
                    <div className={classes.customInput}>
                        <Flex
                            px="14px" py="10px"
                            border="1px solid"
                            borderRadius="8px"
                            borderColor="neutral.gray.800"
                            gap="6px"
                            alignItems="center"
                            userSelect="none"
                            cursor="pointer"
                            width={"100%"}
                        >
                            <AppIcons.Calendar color="#fff" />
                            <Flex ml={2}>
                                {value ? (
                                    <AppTypography fontSize={12} fontWeight={500} color={"#fff"}>
                                        {formatDisplayDate(value)}
                                    </AppTypography>
                                ) : (
                                    <AppTypography fontSize={12} fontWeight={500} color={"#808080"}>
                                        {placeholderText || "Select date"}
                                    </AppTypography>
                                )}
                            </Flex>
                        </Flex>
                    </div>
                }
            />
        </VStack>
    );
}

export default AppDatepicker;
