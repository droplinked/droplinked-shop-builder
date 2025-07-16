import { Flex } from "@chakra-ui/react";
import AppButton from "components/redesign/button/AppButton";
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources";
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
  const { t } = useLocaleResources('common')

  const handleDiscard = () => {
    setTempValue(value);
    onClose();
  };
  const handleConfirm = () => {
    onChange(tempValue);
    onClose();
  };

  return (
    <Flex mx={4} mb={4} justifyContent={{ base: 'center', md: 'end' }} gap={4}>
      <AppButton
        width={{ base: '50%', md: 'min-content' }}
        variant="secondary"
        size="sm"
        onClick={handleDiscard}
      >
        {t('common:discard')}
      </AppButton>
      <AppButton
        width={{ base: '50%', md: 'min-content' }}
        variant="filled"
        size="sm"
        onClick={handleConfirm}
      >
        {t('common:confirm')}
      </AppButton>
    </Flex>
  );
}
