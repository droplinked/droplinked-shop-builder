import { Flex, useRadioGroup } from '@chakra-ui/react'
import React from 'react'
import { PlanDuration } from '../../Plans'
import PlanDurationRadio from './PlanDurationRadio'

interface Props {
    selectedPlanDuration: PlanDuration,
    onChange: (duration: PlanDuration) => void
}

function PlanDurationRadioContainer({ selectedPlanDuration, onChange }: Props) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'selected-plan-duration',
        onChange,
        value: selectedPlanDuration
    })

    return (
        <Flex width={"fit-content"} height={12} alignItems={"center"} gap={1} bg={"#222222"} p={1} borderRadius={8} {...getRootProps()}>
            <PlanDurationRadio text={"Monthly"} {...getRadioProps({ value: "monthly" })} />
            <PlanDurationRadio text={"Yearly"} {...getRadioProps({ value: "yearly" })} />
        </Flex>
    )
}

export default PlanDurationRadioContainer