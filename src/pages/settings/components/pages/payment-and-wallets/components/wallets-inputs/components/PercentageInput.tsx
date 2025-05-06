import React from 'react';
import { Box } from '@chakra-ui/react';
import AppInput from 'components/redesign/input/AppInput';
import AppIcons from 'assets/icon/Appicons';

interface PercentageInputProps {
    value: number;
    onChange: (value: string) => void;
    isEditing: boolean;
}

export const PercentageInput = ({ value, onChange, isEditing }: PercentageInputProps) => (
    <Box width={"7rem"}>
        <AppInput
            inputProps={{
                placeholder: "100",
                value,
                onChange: (e) => onChange(e.target.value),
                // Disable input when not in editing mode
                isDisabled: !isEditing,
                type: "number"
            }}
            inputContainerProps={{ sx: { path: { stroke: "#4F4F4F" } } }}
            rightElement={<AppIcons.GrayPercent />}
        />
    </Box>
);
