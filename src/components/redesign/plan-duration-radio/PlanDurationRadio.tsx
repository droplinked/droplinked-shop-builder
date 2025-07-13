import { Center, Flex, FormLabel, useRadio } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import localEn from "locales/subscription/en.json"
import localAr from "locales/subscription/ar.json"

/**
 * PlanDurationRadio Component - Stylized duration selection option
 * 
 * Radio button for subscription plan duration selection with visual feedback
 * for selected state and optional discount badge when applicable.
 * 
 * @param {object} props - Component props
 * @param {object} props.duration - Duration option data object
 * @param {string} props.duration.label - Display text for the duration option
 * @param {number} [props.duration.discount] - Optional discount percentage to display
 * @param {object} props - Radio control props from useRadioGroup hook
 */
function PlanDurationRadio({ ...props }) {
    const { duration, ...radioProps } = props
    const { state: { isChecked }, getInputProps, htmlProps, getLabelProps } = useRadio(radioProps)
    const { t } = useLocaleResources('subscription', { en: localEn, ar: localAr })

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
                bg={isChecked ? "neutral.gray.800" : "transparent"}
                transition={"all 0.2s"}
                sx={{ "*": { transition: "all 0.2s" } }}
            >
                {
                    <Flex alignItems={"center"} gap={"6px"}>
                        <AppTypography fontSize={14} color={isChecked ? "#fff" : "#B1B1B1"}>
                            {t(duration.label)}
                        </AppTypography>
                        {duration.discount && (
                            <Center paddingBlock={1} paddingInline={2} borderRadius={"100px"} bgColor={"#80EDCF1A"} color={"#2BCFA1"} fontSize={12} fontWeight={600}>
                                {t('plans.savePercent', { percent: duration.discount })}
                            </Center>
                        )}
                    </Flex>
                }
            </Flex>
        </FormLabel>
    )
}

export default PlanDurationRadio