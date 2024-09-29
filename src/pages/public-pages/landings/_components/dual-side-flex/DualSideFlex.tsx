import { Box, Flex, Image } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React from 'react';
import { IDualSideFlex } from '../../types/interfaces';
import CustomHeading from '../heading/Heading';

interface Props extends IDualSideFlex {
    direction: "rtl" | "ltr";
}

export default function DualSideFlex({ direction, image, title, description }: Props) {

    const renderDescription = () => {
        return typeof description === "string" ?
            <AppTypography>{description}</AppTypography>
            :
            <Box as='ul'>
                {description.map((item, index) =>
                    <AppTypography key={index} as={"li"} dir='ltr'>
                        <Box as='span' fontWeight={700}>{item.boldText}</Box> {" "}
                        {item.rest}
                    </AppTypography>
                )}
            </Box>
    }

    return (
        <Flex
            width={"100%"}
            direction={{ base: "column", lg: "row" }}
            alignItems={"center"}
            gap={{ base: 15, lg: 25 }}
            dir={direction}
        >
            <Image
                flexShrink={0}
                maxWidth={{ base: "100%", lg: "50%" }}
                width={"100%"}
                height={"auto"}
                src={image}
                objectFit={"cover"}
            />
            <Flex
                direction={"column"}
                textAlign={{ base: "center", lg: "left" }}
                gap={4}
                sx={{ "p , li": { fontSize: 24, color: "white" } }}
            >
                <CustomHeading title={title} fontSize={36} />
                {renderDescription()}
            </Flex>
        </Flex>
    )
}