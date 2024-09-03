import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { Children, ReactNode } from 'react';

interface Props {
    title: string;
    children?: ReactNode;
}

function SectionedContent({ title, children }: Props) {
    const childrenArray = Children.toArray(children)
    const sectionStyles = {
        padding: 6,
        borderBottom: "1px solid #292929",
    }

    return (
        <Flex
            direction={"column"}
            border={"1px solid #292929"}
            borderRadius={8}
            bgColor={"#1C1C1C"}
            sx={{ "div:last-child": { borderBottom: "none" } }}
        >
            <Box {...sectionStyles}>
                <AppTypography fontSize={20} fontWeight={700} color={"white"}>{title}</AppTypography>
            </Box>
            {childrenArray.map((child, index) =>
                <Box key={index} {...sectionStyles}>
                    {child}
                </Box>
            )}
        </Flex>
    )
}

export default SectionedContent