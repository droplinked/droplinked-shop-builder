import { Flex } from '@chakra-ui/react';
import AppSwitch from 'components/common/swich';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';

interface Props {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

function PaymentLinkSwitch({ title, description, checked, onChange }: Props) {
    return (
        <Flex direction={"column"} gap={1}>
            <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
                <AppTypography fontSize={16} fontWeight={600} color={"#fff"}>{title}</AppTypography>
                <AppSwitch isChecked={checked} onChange={(e) => onChange(e.target.checked)} />
            </Flex>
            <AppTypography fontSize={14} fontWeight={400} color={"#fff"}>{description}</AppTypography>
        </Flex>
    )
}

export default PaymentLinkSwitch