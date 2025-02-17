import { Box, Flex, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import React from "react";
import DateInput from "../components/DateInput";
import DatePicker from '../components/DatePicker';
import SideControls from "../components/SideControls";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    value: Value;
    tempValue: Value;
    setTempValue: (value: Value) => void;
    onChange: (value: Value) => void;
}

export default function DesktopDateRangePicker({
    isOpen,
    onClose,
    onOpen,
    value,
    tempValue,
    setTempValue,
    onChange
}: Props) {
    return (
        <Popover isOpen={isOpen} onClose={onClose} placement="auto">
            <PopoverTrigger>
                <Box>
                    <DateInput onClick={onOpen} selectedDate={value} />
                </Box>
            </PopoverTrigger>
            <PopoverContent
                display="flex"
                flexDirection="row"
                width="100%"
                background="#1c1c1c"
                border="none"
                padding={0}
                margin={0}
                borderRadius="16px"
            >
                <SideControls setTempValue={setTempValue} />
                <Flex borderLeft="1px solid #292929" direction="column">
                    <DatePicker
                        value={value}
                        onChange={onChange}
                        onCalendarClose={onClose}
                        tempValue={tempValue}
                        setTempValue={setTempValue}
                        showFooter={true}
                        showControls={true}
                    />
                </Flex>
            </PopoverContent>
        </Popover>
    );
}
