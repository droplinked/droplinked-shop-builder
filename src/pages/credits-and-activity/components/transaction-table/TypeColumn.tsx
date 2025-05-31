import { Flex, useMediaQuery } from '@chakra-ui/react';
import { ArrowdownLg } from 'assets/icons/Navigation/ArrowDown/ArrowdownLg';
import { ArrowupLg } from 'assets/icons/Navigation/ArrowUp/ArrowupLg';
import AppTypography from 'components/common/typography/AppTypography';
import IconWrapper from 'components/redesign/icon-wrapper/IconWrapper';
import React from 'react';

interface Props {
    amountType: string
    type: string
}

export default function TypeColumn({ amountType, type }: Props) {
    const isInbound = amountType === "INCREASE"
    const [isMobile] = useMediaQuery('(max-width: 768px)')

    return (
        <Flex
            direction={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            gap={4}
        >
            <IconWrapper
                bg={isInbound ? "#2bcfa11a" : "#ff22440d"}
                border={`1px solid ${isInbound ? "#2bcfa11a" : "#ff224426"}`}
                icon={
                    isInbound
                        ? <ArrowdownLg color='#2bcfa1' />
                        : <ArrowupLg color='#ff2244' />
                }
            />
            <AppTypography color="#fff" fontSize={16}>{type}</AppTypography>
        </Flex>
    )
}
