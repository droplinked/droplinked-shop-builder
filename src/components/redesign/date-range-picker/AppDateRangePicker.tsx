import React, { useEffect } from "react";
import { useState } from "react";
import DateRangePicker, { DateRangePickerProps } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { Box, Popover, PopoverTrigger, PopoverContent, useDisclosure, Flex } from "@chakra-ui/react";
import DateInput from "./components/DateInput";
import classes from "./styles.module.scss";
import AppIcons from "assest/icon/Appicons";
import DateRangeFooter from "./components/DateRangeFooter";
import ControlButtons from "./components/ControlButtons";
import SideControls from "./components/SideControls";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props extends DateRangePickerProps {
  value: Value;
  onChange: (value: Value) => void;
}

export default function AppDateRangePicker({ value, onChange }: Props) {
  const [tempValue, setTempValue] = useState<Value>(value);
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!isOpen) {
      setTempValue(value);
    }
  }, [isOpen])

  if (value instanceof Array && value.length < 2) {
    return null;
  }

  return (
    <Box>
      <Popover isOpen={isOpen} onClose={onClose} placement="auto">
        <PopoverTrigger>
          <Box>
            <DateInput onClick={onOpen} selectedDate={value} />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          display={"flex"}
          flexDirection={"row"}
          width={"100%"}
          background={"#1c1c1c"}
          border={"none"}
          padding={0}
          margin={0}
          borderRadius="16px"
        >
          <SideControls setTempValue={setTempValue} />
          <Flex borderLeft={"1px solid #292929"} direction="column">
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
              onCalendarClose={onClose}
              shouldCloseCalendar={() => false}
              onChange={setTempValue}
              value={tempValue}
            />

            <DateRangeFooter value={tempValue} />
            <ControlButtons tempValue={tempValue} setTempValue={setTempValue} value={value} onChange={onChange} onClose={onClose} />
          </Flex>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
