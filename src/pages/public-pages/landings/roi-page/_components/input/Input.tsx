import { Flex, FormLabel, Tooltip } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import React, { ReactNode } from 'react';
import styles from "./styles.module.scss";

interface Props {
    label: string;
    value: string;
    isDisabled?: boolean;
    errorMessage?: string; //only for Total SKUs input
    leftIcon?: ReactNode;
    tooltipText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, value, errorMessage, isDisabled = false, leftIcon, tooltipText, onChange }: Props) {
    const onKeyDown = (e) => {
        if (e.key === '+' || e.key === '-' || e.key === 'e') e.preventDefault()
    }

    return (
        <Flex direction="column" gap={2}>
            <div className={styles["input-group"]}>
                {leftIcon}
                <input type={"number"} value={value} min={0} placeholder=" " disabled={isDisabled} onKeyDown={onKeyDown} onChange={onChange} />
                <FormLabel left={leftIcon ? "42px" : "12px"}>{label}</FormLabel>
                {tooltipText &&
                    <Tooltip label={tooltipText} padding={"12px 16px"} borderRadius={8} bgColor={"#fff"} color={"#000"}>
                        <AppIcons.BlackCircleI />
                    </Tooltip>
                }
            </div>
            {errorMessage && <AppTypography ml={4} fontSize={12} color={"#E72341"}>{errorMessage}</AppTypography>}
        </Flex>
    )
}

export default Input