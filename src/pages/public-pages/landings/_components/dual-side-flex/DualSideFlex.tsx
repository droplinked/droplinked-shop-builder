import { Box, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { IDualSideFlex } from '../../types/interfaces';
import SpectrumHeader from '../spectrum-header/SpectrumHeader';

interface Props extends IDualSideFlex {
    direction: 'rtl' | 'ltr';
}

export default function DualSideFlex({ direction, image, title, description }: Props) {
    const [isSmallerThan1280] = useMediaQuery('(max-width: 1279px)')

    const renderDescription = () => {
        if (typeof description === 'string') return <AppTypography>{description}</AppTypography>

        return (
            <Box as='ul' pl={3}>
                {description.map(({ boldText, rest }, index) => (
                    <AppTypography key={index} as='li' dir='ltr'>
                        <Box as='span' fontWeight={700}>{boldText}</Box> {rest}
                    </AppTypography>
                ))}
            </Box>
        )
    }

    return (
        <Flex
            width="100%"
            direction={{ base: 'column', lg: 'row' }}
            alignItems={{ base: "flex-start", lg: "center" }}
            gap={{ base: 12, lg: 9, xl: "80px" }}
            dir={isSmallerThan1280 ? "lte" : direction}
        >
            <Image
                flexShrink={0}
                alignSelf="center"
                width={{ base: "328px", md: "518px", lg: "474px", xl: "526px" }}
                height="auto"
                src={image}
                objectFit="cover"
            />
            <Flex
                dir="ltr"
                direction="column"
                gap={4}
                sx={{ "p , li": { fontSize: { base: 16, xl: 18 } }, color: "white" }}
            >
                <SpectrumHeader fontSize={{ base: 20, lg: 28 }}>{title}</SpectrumHeader>
                {renderDescription()}
            </Flex>
        </Flex>
    )
}