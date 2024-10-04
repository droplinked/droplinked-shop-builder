import { Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { PropsWithChildren } from 'react';
import { ISectionWithText } from '../../types/interfaces';
import SpectrumHeader from '../spectrum-header/SpectrumHeader';

interface Props extends ISectionWithText, PropsWithChildren { }

function Details({ title, description, children }: Props) {
    return (
        <Flex
            width="100%"
            direction="column"
            gap={{ base: 12, lg: 20 }}
        >
            <Flex direction="column" alignItems="center" gap={{ base: 2, lg: 4 }} sx={{ textAlign: "center" }}>
                <SpectrumHeader fontSize={{ base: 20, lg: 28 }}>{title}</SpectrumHeader>
                <AppTypography fontSize={{ base: 16, xl: 18 }} color="white">{description}</AppTypography>
            </Flex>
            {children}
        </Flex>
    )
}

export default Details