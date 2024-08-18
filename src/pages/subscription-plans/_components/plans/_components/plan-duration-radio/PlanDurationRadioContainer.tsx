import { Flex, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import useSubscriptionPlanPurchaseStore, { planDurations } from '../../store/planPurchaseStore'
import PlanDurationRadio from './PlanDurationRadio'

function PlanDurationRadioContainer() {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const updatePlanDuration = useSubscriptionPlanPurchaseStore((state) => state.updatePlanDuration)

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-plan-duration',
        onChange: (label) => updatePlanDuration(planDurations.find((duration) => duration.label === label)),
        value: preferredPlanDuration.label
    })

    return (
        <Flex width={"fit-content"} height={12} alignItems={"center"} gap={1} bg={"#222222"} p={1} borderRadius={8} {...getRootProps()}>
            {planDurations.map((duration) => <PlanDurationRadio key={duration.month} duration={duration} {...getRadioProps({ value: duration.label })} />)}
        </Flex>
    )
}

export default PlanDurationRadioContainer