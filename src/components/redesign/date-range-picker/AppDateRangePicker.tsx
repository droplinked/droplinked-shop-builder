import React from "react";
import { useState } from "react";
import DateRangePicker, { DateRangePickerProps } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Box, Popover, PopoverTrigger, PopoverContent, useDisclosure } from "@chakra-ui/react";
import DateInput from "./components/DateInput";
import classes from "./styles.module.scss";
import AppIcons from "assest/icon/Appicons";
import DateRangeFooter from "./components/DateRangeFooter";
import ControlButtons from "./components/ControlButtons";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props extends DateRangePickerProps {
  value: Value;
  onChange: (value: Value) => void;
}

export default function AppDateRangePicker({ minDate, value, onChange }: Props) {
  const [tempValue, setTempValue] = useState<Value>(value);
  const { isOpen, onClose, onOpen } = useDisclosure();

  if (value instanceof Array && value.length < 2) {
    return null;
  }

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start" closeOnBlur={false} closeOnEsc={false}>
        <PopoverTrigger>
          <DateInput onClick={onOpen} selectedDate={tempValue} />
        </PopoverTrigger>
        <PopoverContent background={"#1c1c1c"} border={"none"} padding={0} margin={0} borderBottomRadius="16px">
          <DateRangePicker
            className={classes.datepicker}
            calendarProps={{
              view: "month",
              minDetail: "month",
              nextLabel: <AppIcons.ChevronRight />,
              prevLabel: <AppIcons.ChevronLeft />,
              formatShortWeekday: (locale, date) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
              locale: "en-US",
            }}
            isOpen={true}
            onCalendarClose={onClose}
            shouldCloseCalendar={({ reason }) => false}
            minDate={minDate ? minDate : new Date()}
            onChange={setTempValue}
            value={tempValue}
          />

          <DateRangeFooter value={tempValue} />
          <ControlButtons tempValue={tempValue} setTempValue={setTempValue} value={value} onChange={onChange} onClose={onClose} />
        </PopoverContent>
      </Popover>
    </Box>
  );
}
