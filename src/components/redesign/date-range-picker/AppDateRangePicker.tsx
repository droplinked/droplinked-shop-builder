import React from "react";
import { useState } from "react";
import DateRangePicker, { DateRangePickerProps } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Box, useDisclosure } from "@chakra-ui/react";
import DateInput from "./components/DateInput";
import classes from "./styles.module.scss";
import AppIcons from "assest/icon/Appicons";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Props extends DateRangePickerProps {}

export default function AppDateRangePicker({ minDate }: Props) {
  const [value, onChange] = useState<Value>([new Date(), new Date()]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleDatePicker = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <Box>
      <DateInput onClick={handleDatePicker} selectedDate={[new Date(), new Date()]} />
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
    </Box>
  );
}
