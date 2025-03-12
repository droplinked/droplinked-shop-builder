import { Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import Input from "components/redesign/input/Input";
import { forwardRef, useState } from "react";
import React from "react";
export const CustomTimeInput = forwardRef((props: any, ref) => {
    const { value, onChange } = props;
    const [hours, setHours] = useState<string>(value.split(":")[0] || "00");
    const [minutes, setMinutes] = useState<string>(value.split(":")[1] || "00");

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newHours = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
        if (parseInt(newHours) > 23) {
            newHours = "00";
        }
        setHours(newHours);
        const updatedTime = `${newHours}:${minutes}`;
        onChange(updatedTime);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newMinutes = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
        if (parseInt(newMinutes) > 59) {
            newMinutes = "00";
        }
        setMinutes(newMinutes);
        const updatedTime = `${hours}:${newMinutes}`;
        onChange(updatedTime);
    };

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
            <AppTypography fontWeight={500} fontSize="14px">
                Time
            </AppTypography>
            <Flex gap={2} alignItems={"center"}>
                <Input
                    inputProps={{
                        border: "1px solid",
                        borderColor: "neutral.gray.800",
                        borderRadius: "8px",
                        padding: "12px 12px",
                        width: "2.7rem !important",
                        textAlign: "center",
                        value: hours,
                        onChange: handleHoursChange,
                        name: "hours",
                        background: "transparent !important",
                    }}
                    inputContainerProps={{
                        border: "none",
                        padding: "0px"
                    }}
                />
                <AppTypography color={"text.subtextPlaceholder.dark"} fontWeight={900} fontSize={"14px"}>
                    :
                </AppTypography>
                <Input
                    inputProps={{
                        border: "1px solid",
                        borderColor: "neutral.gray.800",
                        borderRadius: "8px",
                        padding: "12px 12px",
                        width: "2.7rem !important",
                        textAlign: "center",
                        value: minutes,
                        onChange: handleMinutesChange,
                        name: "minutes",
                        background: "transparent !important",
                    }}
                    inputContainerProps={{
                        border: "none",
                        padding: "0px"
                    }}
                />
            </Flex>
        </Flex>
    );
});
