import { Box, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { DateRangePickerProps } from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import DateInput from "./components/DateInput";
import DesktopDateRangePicker from "./desktop/DesktopDateRangePicker";
import MobileDateRangePicker from "./mobile/MobileDateRangePicker";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props extends DateRangePickerProps {
  value: Value;
  onChange: (value: Value) => void;
}

export default function AppDateRangePicker({ value, onChange }: Props) {
  const [tempValue, setTempValue] = useState<Value>(value);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (!isOpen) {
      setTempValue(value);
    }
  }, [isOpen]);

  if (value instanceof Array && value.length < 2) return null;

  if (isSmallerThan768) {
    return (
      <Box>
        <DateInput onClick={onOpen} selectedDate={value} />
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
    <Box>
      <DesktopDateRangePicker
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        value={value}
        tempValue={tempValue}
        onChange={onChange}
        setTempValue={setTempValue}
      />
    </Box>
  );
}
