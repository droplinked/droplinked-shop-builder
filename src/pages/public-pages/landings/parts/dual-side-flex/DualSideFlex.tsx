import { Flex, Image } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import CustomHeading from '../heading/Heading';

interface Props {
    direction: "rtl" | "ltr";
    image: string;
    title: string;
    description: string;
}

function DualSideFlex({ direction, image, title, description }: Props) {
    return (
        <Flex width={"100%"} dir={direction} direction={{ base: "column", lg: "row" }} alignItems={"center"} gap={{ base: 15, lg: 25 }}>
            <Image flexShrink={0} maxWidth={{ base: "100%", lg: "50%" }} width={"100%"} height={"auto"} src={image} objectFit={"cover"} />
            <Flex direction={"column"} textAlign={{ base: "center", lg: "left" }} gap={4}>
                <CustomHeading title={title} fontSize={36} />
                <AppTypography fontSize={24} color={"#fff"}>{description}</AppTypography>
            </Flex>
        </Flex>
    )
}

export default DualSideFlex