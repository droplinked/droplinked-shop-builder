import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import styles from "./styles.module.scss";

interface Props {
    isSelected: boolean;
    onChange: () => void;
    title: string;
    duration: number;
    skus: number;
    productRecords: number;
    baseCommitment: number;
}

function Radio({ isSelected, onChange, title, duration, skus, productRecords, baseCommitment }: Props) {
    return (
        <div className={styles["custom-radio-group"]}>
            <input id={title} name="selected-plan" type='radio' value={title} onChange={onChange} checked={isSelected} />
            <label htmlFor={title}>
                <div className={styles["custom-radio"]}></div>
                <div className={styles["label-content"]}>
                    <div>
                        <span>{title}</span>
                        <span>{`${duration} Days`}</span>
                    </div>
                    <div>
                        <PlanDetails title='SKUs' value={skus} />
                        <PlanDetails title='Product Records' value={productRecords} />
                        <PlanDetails title='Base Commitment' value={baseCommitment} />
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
            <Box as="span" fontSize={14}>{value.toLocaleString()}</Box>
        </Flex>
    )
}

export default Radio