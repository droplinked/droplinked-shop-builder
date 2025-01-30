import { Flex } from "@chakra-ui/react";
import Button from "components/redesign/button/Button";
import React from "react";

type ValuePiece = Date | null;
type Value = [ValuePiece, ValuePiece] | ValuePiece;

interface Props {
  value: Value;
  tempValue: Value;
  onClose: () => void;
  onChange: (value: Value) => void;
  setTempValue: (value: Value) => void;
}

export default function ControlButtons({ value, tempValue, setTempValue, onChange, onClose }: Props) {
  const handleDiscard = () => {
    setTempValue(value);
    onClose();
  };
  const handleConfirm = () => {
    onChange(tempValue);
    onClose();
  };

  return (
    <Flex mx={4} mb={4} justifyContent={{ base: "center", md: "end" }} gap={4}>
      <Button
        width={{ base: "50%", md: "min-content" }}
        paddingInline={"12px"}
        fontSize={12}
        fontWeight={500}
        variant="secondary"
        onClick={handleDiscard}
      >
        Discard
      </Button>
      <Button
        width={{ base: "50%", md: "min-content" }}
        paddingInline={"12px"}
        fontSize={12}
        fontWeight={500}
        variant="primary"
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </Flex>
  );
}
