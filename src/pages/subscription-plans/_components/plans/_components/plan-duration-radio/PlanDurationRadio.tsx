import { Center, Flex, FormLabel, useRadio } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"

function PlanDurationRadio({ ...props }) {
    const { duration, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
        <FormLabel height={"100%"} margin={0} cursor='pointer' {...htmlProps} {...getLabelProps()}>
            <input {...getInputProps()} hidden />
            <Flex
                width={"140px"}
                height={"100%"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"6px"}
                borderRadius={6}
                bg={isChecked ? "#292929" : "transparent"}
                transition={"all 0.2s"}
                sx={{ "*": { transition: "all 0.2s" } }}
            >
                {
                    <Flex alignItems={"center"} gap={"6px"}>
                        <AppTypography fontSize={14} color={isChecked ? "#fff" : "#B1B1B1"}>
                            {duration.label}
                        </AppTypography>
                        {duration.discount && <Center paddingBlock={1} paddingInline={2} borderRadius={"100px"} bgColor={"#80EDCF1A"} color={"#2BCFA1"} fontSize={12} fontWeight={600}>{`-${duration.discount}%`}</Center>}
                    </Flex>
                }
            </Flex>
        </FormLabel>
    )
}

export default PlanDurationRadio