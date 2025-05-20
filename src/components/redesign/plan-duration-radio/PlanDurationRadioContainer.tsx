import { Flex, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import useSubscriptionPlanPurchaseStore, { planDurations } from '../../../stores/subscription-plan.ts/subscriptionPlanStore'
import PlanDurationRadio from './PlanDurationRadio'

/**
 * PlanDurationRadioContainer Component - Plan duration selection group
 * 
 * Horizontal scrollable container of radio options for selecting subscription
 * plan durations, with global state integration and custom scrollbar styling.
 * 
 * @returns {JSX.Element} A scrollable radio group for selecting plan durations
 */
function PlanDurationRadioContainer() {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const updatePlanDuration = useSubscriptionPlanPurchaseStore((state) => state.updatePlanDuration)

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-plan-duration',
        onChange: (label) => updatePlanDuration(planDurations.find((duration) => duration.label === label)),
        value: preferredPlanDuration.label
    })

    return (
        <Flex
            width={"fit-content"}
            maxWidth={"100%"}
            overflowY={"auto"}
            height={12}
            alignItems={"center"}
            gap={1}
            bg={"neutral.gray.1000"}
            p={"6px"}
            borderRadius={8}
            sx={{
                /* Firefox */
                scrollbarWidth: "thin", /* Makes the scrollbar thinner */
                scrollbarColor: "#2BCFA1 transparent", /* Thumb is #2BCFA1, track is transparent */

                /* Webkit-based browsers (e.g., Chrome, Safari) */
                "&::-webkit-scrollbar": {
                    width: "4px", /* Adjusts the width of the scrollbar for vertical scroll */
                    height: "4px", /* Adjusts the height of the scrollbar for horizontal scroll */
                },
                "&::-webkit-scrollbar-track": {
                    background: "transparent", /* Makes the scrollbar track transparent */
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#2BCFA1", /* Sets the scrollbar thumb color to #2BCFA1 */
                    borderRadius: "12px", /* Increases the border-radius for a more rounded thumb */
                    border: "2px solid transparent", /* Optional: adds spacing around the thumb */
                },
            }}
            {...getRootProps()}
        >
            {planDurations.map((duration) => <PlanDurationRadio key={duration.month} duration={duration} {...getRadioProps({ value: duration.label })} />)}
        </Flex>
    )
}

export default PlanDurationRadioContainer