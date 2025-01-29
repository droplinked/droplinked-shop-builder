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

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AppDateRangePicker({ minDate }: DateRangePickerProps) {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start" closeOnBlur={false} closeOnEsc={false}>
        <PopoverTrigger>
          <Box>
            <DateInput onClick={onOpen} selectedDate={[new Date(), new Date()]} />
          </Box>
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
            isOpen={isOpen}
            onCalendarClose={onClose}
            shouldCloseCalendar={({ reason }) => reason !== "select"}
            minDate={minDate ? minDate : new Date()}
            onChange={onChange}
            value={value}
          />

          <DateRangeFooter value={value} />
        </PopoverContent>
      </Popover>
    </Box>
  );
}
