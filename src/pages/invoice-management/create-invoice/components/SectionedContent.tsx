import { Box, Flex, FlexProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { Children, ReactNode } from 'react';

interface Props extends FlexProps {
    title: string;
    children?: ReactNode;
}

function SectionedContent({ title, children, ...props }: Props) {
    const childrenArray = Children.toArray(children)
    const sectionStyles = {
        padding: 6,
        borderBottom: "1px solid #292929",
    }

    return (
        <Flex
            height={"fit-content"}
            direction={"column"}
            border={"1px solid #292929"}
            borderRadius={8}
            bgColor={"#1C1C1C"}
            sx={{ "&>div:last-child": { borderBottom: "none" } }}
            {...props}
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