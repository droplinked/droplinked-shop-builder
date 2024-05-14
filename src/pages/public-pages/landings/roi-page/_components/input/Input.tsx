import { Flex, FormLabel } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { ReactNode } from 'react';
import styles from "./styles.module.scss";

interface Props {
    label: string;
    value: string;
    isDisabled?: boolean;
    errorMessage?: string; //only for Total SKUs input
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, value, errorMessage, isDisabled = false, leftIcon, rightIcon, onChange }: Props) {
    const onKeyDown = (e) => {
        if (e.key === '+' || e.key === '-' || e.key === 'e') e.preventDefault()
    }

    return (
        <Flex direction="column" gap={2}>
            <div className={styles["input-group"]}>
                {leftIcon}
                <input type={"number"} value={value} placeholder=" " disabled={isDisabled} onKeyDown={onKeyDown} onChange={onChange} />
                <FormLabel left={leftIcon ? "42px" : "12px"}>{label}</FormLabel>
                {rightIcon}
            </div>
            {errorMessage && <AppTypography ml={4} fontSize={12} color={"#E72341"}>{errorMessage}</AppTypography>}
        </Flex>
    )
}

export default Input