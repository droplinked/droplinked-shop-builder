import React from 'react';
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import AppIcons from 'assest/icon/Appicons';
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import classes from "../../styles.module.scss";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    value: Value;
    onChange: (value: Value) => void;
}

export default function DatePickerTab({ value, onChange }: Props) {
    return (
        <DateRangePicker
            className={classes.datepicker}
            calendarProps={{
                view: "month",
                minDetail: "month",
                nextLabel: <AppIcons.ChevronRight />,
                prevLabel: <AppIcons.ChevronLeft />,
                formatShortWeekday: (locale, date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
                locale: "en-US",
                activeStartDate: null,
            }}
            isOpen={true}
            shouldCloseCalendar={() => false}
            onChange={onChange}
            value={value}
        />
    );
}
