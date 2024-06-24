import { Box, Flex, InputProps } from "@chakra-ui/react";
import AppInput from "components/common/form/textbox/AppInput";
import AppTypography from "components/common/typography/AppTypography";
import ShowPassword from "components/modals/signup-modal/signup-producer/parts/showPassword/ShowPassword";
import React, { useState } from 'react';

interface Props extends InputProps {
    label: string;
    type: string;
    value: any;
    isRequired?: boolean;
    error?: string
}

function InvitationInput({ label, type, value, isRequired, error, ...props }: Props) {
    const [inputType, setInputType] = useState(type)
    const toggleInputType = () => setInputType(inputType === "password" ? "text" : "password")

    return (
        <Flex direction="column" gap={2} userSelect={"none"}>
            <AppTypography fontSize={14} fontWeight={600} color={"#fff"}>{label} {isRequired && <Box as="span" color={"#2BCFA1"}>(Required)</Box>}</AppTypography>
            <Flex direction={"column"} gap={2}>
                <Box position={"relative"}>
                    <AppInput
                        name=""
                        type={inputType}
                        value={value}
                        color={props.isReadOnly ? "#616161" : "#C2C2C2"}
                        fontSize={14}
                        {...props}
                    />
                    {type === "password" &&
                        <ShowPassword showed={inputType === "text"} onClick={() => toggleInputType()} />
                    }
                </Box>
                {error && <AppTypography color='red.300'>{error}</AppTypography>}
            </Flex>
        </Flex>
    )
}

export default InvitationInput