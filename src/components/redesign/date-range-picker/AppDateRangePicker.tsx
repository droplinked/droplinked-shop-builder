import { Box, ChakraProps, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { DateRangePickerProps } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DateInput from "./components/DateInput";
import DesktopDateRangePicker from "./desktop/DesktopDateRangePicker";
import MobileDateRangePicker from "./mobile/MobileDateRangePicker";

type ValuePiece = Date | null;
export type DateRangeValue = [ValuePiece, ValuePiece] | ValuePiece;

interface Props extends DateRangePickerProps {
  value: DateRangeValue;
  onChange: (value: DateRangeValue) => void;
  width?: ChakraProps["width"];
}

export default function AppDateRangePicker({ value, onChange, disabled, width }: Props) {
  const [tempValue, setTempValue] = useState<DateRangeValue>(value);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSmallerThan1024] = useMediaQuery('(max-width: 1024px)')

  useEffect(() => {
    if (!isOpen) {
      setTempValue(value);
    }
  }, [isOpen]);

  if (value instanceof Array && value.length < 2) return null;

  if (isSmallerThan1024) {
    return (
      <Box width={width} opacity={disabled ? "0.5" : "1"}>
        <DateInput onClick={() => !disabled && onOpen()} selectedDate={value} />
        <MobileDateRangePicker
          isOpen={isOpen}
          onClose={onClose}
          value={value}
          tempValue={tempValue}
          onChange={onChange}
          setTempValue={setTempValue}
        />
      </Box>
    );
  }

  return (
    <Box width={width} opacity={disabled ? "0.5" : "1"}>
      <DesktopDateRangePicker
        isOpen={isOpen}
        onClose={onClose}
        onOpen={() => !disabled && onOpen()}
        value={value}
        tempValue={tempValue}
        onChange={onChange}
        setTempValue={setTempValue}
      />
    </Box>
  );
}
