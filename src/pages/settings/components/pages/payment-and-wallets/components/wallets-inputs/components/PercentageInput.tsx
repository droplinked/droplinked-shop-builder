import React from 'react';
import { Box } from '@chakra-ui/react';
import Input from 'components/redesign/input/Input';
import AppIcons from 'assest/icon/Appicons';

interface PercentageInputProps {
    value: number;
    onChange: (value: string) => void;
    isEditing: boolean;
}

export const PercentageInput = ({ value, onChange, isEditing }: PercentageInputProps) => (
    <Box width={"7rem"}>
        <Input
            inputProps={{
                placeholder: "100",
                value,
                onChange: (e) => onChange(e.target.value),
                isDisabled: !isEditing
            }}
            inputContainerProps={{ sx: { path: { stroke: "#4F4F4F" } } }}
            rightElement={<AppIcons.GrayPercent />}
        />
    </Box>
);
