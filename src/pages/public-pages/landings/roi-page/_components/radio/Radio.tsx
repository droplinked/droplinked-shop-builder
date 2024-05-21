import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Plan } from '../../utils/interfaces/interfaces';
import styles from "./styles.module.scss";

interface Props {
    plan: Plan;
    isSelected: boolean;
    onChange: () => void;
}

function Radio({ plan, isSelected, onChange, }: Props) {
    return (
        <div className={styles["custom-radio-group"]}>
            <input id={plan.title} name="selected-plan" type='radio' value={plan.title} onChange={onChange} checked={isSelected} />
            <label htmlFor={plan.title}>
                <div className={styles["custom-radio"]}></div>
                <div className={styles["label-content"]}>
                    <div>
                        <span>{plan.title}</span>
                        <span>{`${plan.duration} Days`}</span>
                    </div>
                    <div>
                        <PlanDetails title='SKUs' value={plan.skus} />
                        <PlanDetails title='Product Records' value={plan.productRecords} />
                        <PlanDetails title='Base Commitment' value={plan.baseCommitment} />
                    </div>
                </div>
            </label>
        </div>
    )
}

function PlanDetails({ title, value }: { title: string, value: number }) {
    return (
        <Flex alignItems={"center"} gap={2}>
            <Box as="span" className={styles['details-title']}>{title}</Box>
            <Box width={1} height={1} borderRadius={"50%"} bgColor={"#DBDBDB"} />
            <Box as="span" fontSize={14}>{`${title === "Base Commitment" ? "$" : ""}${value.toLocaleString()}`}</Box>
        </Flex>
    )
}

export default Radio