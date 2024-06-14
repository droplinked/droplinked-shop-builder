import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { LegalUsage } from 'lib/apis/subscription/interfaces';
import React from 'react';
import CircularProgressBar from './CircularProgressBar';
import Container from './Container';

function LegalUsageItem({ legalUsage }: { legalUsage: LegalUsage }) {
    const { used, all, key, remaining } = legalUsage
    const title = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    return (
        <Container>
            <AppTypography fontSize={14} fontWeight={600} color={"white"}>{title}</AppTypography>
            <Flex alignItems={"center"} gap={5}>
                <CircularProgressBar used={used} all={all} />
                <AppTypography color={"white"}>Remaining: <Box as='span' fontWeight={600}>{remaining}</Box></AppTypography>
            </Flex>
        </Container>
    )
}

export default LegalUsageItem