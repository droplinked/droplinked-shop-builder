import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import { ChevronleftMd } from "assets/icons/Navigation/ChevronLeft/ChevronleftMd";
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
import React from "react";
import "react-calendar/dist/Calendar.css";
import classes from "../styles.module.scss";
import ControlButtons from "./ControlButtons";
import DateRangeFooter from "./DateRangeFooter";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    value?: Value;
    onChange?: (value: Value) => void;
    onCalendarClose?: () => void;
    tempValue?: Value;
    setTempValue?: (value: Value) => void;
    showFooter?: boolean;
    showControls?: boolean;
}

export default function DatePicker({
    value,
    onChange,
    onCalendarClose,
    tempValue,
    setTempValue,
    showFooter = false,
    showControls = false
}: Props) {
    const { isRTL } = useLocaleResources('common');

    return (
        <>
            <DateRangePicker
                className={classes.datepicker}
                calendarProps={{
                    view: "month",
                    minDetail: "month",
                    nextLabel: isRTL ? <ChevronleftMd /> : <ChevronrightMd /> ,
                    prevLabel: isRTL ? <ChevronrightMd /> : <ChevronleftMd /> ,
                    formatShortWeekday: (locale, date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
                    locale: "en-US",
                }}
                isOpen={true}
                shouldCloseCalendar={() => false}
                onChange={setTempValue}
                value={tempValue}
                onCalendarClose={onCalendarClose}
            />
            {showFooter && tempValue && <DateRangeFooter value={tempValue} />}
            {showControls && tempValue && <ControlButtons tempValue={tempValue} setTempValue={setTempValue} value={value} onChange={onChange} onClose={onCalendarClose} />}
        </>
    );
}
