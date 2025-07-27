import { Box, Flex, FlexProps } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import arLocale from 'locales/invoice-management/ar.json';
import enLocale from 'locales/invoice-management/en.json';
import React, { Children, ReactNode } from 'react';

interface Props extends FlexProps {
    title: string;
    children?: ReactNode;
}

function SectionedContent({ title, children, ...props }: Props) {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale })
    const childrenArray = Children.toArray(children)
    const sectionStyles = {
        padding: 6,
        borderBottom: "1px solid",
        borderColor:"neutral.gray.800"
    }

    return (
        <Flex
            height={"fit-content"}
            direction={"column"}
            border={"1px solid"}
            borderColor="neutral.gray.800"
            borderRadius={8}
            bgColor={"neutral.gray.1000"}
            sx={{ "&>div:last-child": { borderBottom: "none" } }}
            {...props}
        >
            <Box {...sectionStyles}>
                <AppTypography fontSize={20} fontWeight={700} color={"white"}>
                    {title === "Client Details" ? t('SectionedContent.clientDetails') : 
                     title === "Summary" ? t('SectionedContent.summary') : 
                     title}
                </AppTypography>
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