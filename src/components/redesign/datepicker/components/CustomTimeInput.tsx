import { Flex } from "@chakra-ui/react";
import AppInput from "components/common/form/textbox/AppInput";
import AppTypography from "components/common/typography/AppTypography";
import { forwardRef, useState } from "react";
import React from "react";
export const ExampleCustomTimeInput = forwardRef((props: any, ref) => {
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
                <AppInput
                    border={"1px solid #292929"}
                    borderRadius={"8px"}
                    padding={"16px 12px"}
                    width={"2.7rem !important"}
                    value={hours}
                    onChange={handleHoursChange}
                    name="hours"
                    background={"transparent !important"}
                />
                <AppTypography color={"#7B7B7B"} fontWeight={900} fontSize={"14px"}>
                    :
                </AppTypography>
                <AppInput
                    background={"transparent !important"}
                    border={"1px solid #292929"}
                    borderRadius={"8px"}
                    padding={"16px 12px"}
                    width={"2.7rem !important"}
                    value={minutes}
                    onChange={handleMinutesChange}
                    name="minutes"
                />
            </Flex>
        </Flex>
    );
});
