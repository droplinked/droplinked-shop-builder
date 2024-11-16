import * as React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import { data } from './data';
import { Link } from 'react-router-dom';
import AppTypography from 'components/common/typography/AppTypography';
function LinksSection() {
    return (
        <Box display={"flex"} mt={"2rem"} width={"100%"} alignItems={"start"} flexWrap={"wrap"} gap="2rem" justifyContent={{ md: "start", lg: "space-around" }}>
            {data.map((section, index) => (
                <VStack key={index} align={"start"} gap={"1rem"}>
                    <AppTypography color={"#fff"} fontWeight={"700"} fontSize={"14px"}>{section.parentTitle}</AppTypography>
                    {section.childs.map((child, childIndex) => (
                        <Link key={childIndex} target='_blank' to={child.link} color={"blue.500"}>
                            <AppTypography color={"#B1B1B1"} fontSize={"14px"} fontWeight={400}>
                                {child.title}
                            </AppTypography>
                        </Link>
                    ))}
                </VStack>
            ))}
        </Box>
    );
}

export default LinksSection;