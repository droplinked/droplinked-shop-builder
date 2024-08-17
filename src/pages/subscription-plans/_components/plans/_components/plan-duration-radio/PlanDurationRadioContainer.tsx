import { Flex, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import useSubscriptionPlanPurchaseStore from '../../store/planPurchaseStore'
import PlanDurationRadio from './PlanDurationRadio'

function PlanDurationRadioContainer() {
    const preferredPlanDuration = useSubscriptionPlanPurchaseStore((state) => state.preferredPlanDuration)
    const updatePlanDuration = useSubscriptionPlanPurchaseStore((state) => state.updatePlanDuration)

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'preferred-plan-duration',
        onChange: updatePlanDuration,
        value: preferredPlanDuration
    })

    return (
        <Flex width={"fit-content"} height={12} alignItems={"center"} gap={1} bg={"#222222"} p={1} borderRadius={8} {...getRootProps()}>
            <PlanDurationRadio text={"Monthly"} {...getRadioProps({ value: "monthly" })} />
            <PlanDurationRadio text={"Yearly"} {...getRadioProps({ value: "yearly" })} />
        </Flex>
    )
}

export default PlanDurationRadioContainer