import { Box, Flex, Switch } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import React, { ReactNode } from 'react';

interface Props {
    title: string;
    description: string;
    isExpanded?: boolean;
    onToggle?: () => void;
    children: ReactNode;
}

function ToggleableSection({ title, description, isExpanded, onToggle, children }: Props) {
    return (
        <>
            <Flex justifyContent={"space-between"}>
                <Flex direction={"column"} gap={1}>
                    <AppTypography fontSize={16} fontWeight={500} color={"white"}>{title}</AppTypography>
                    <AppTypography fontSize={14} color={"#B1B1B1"}>{description}</AppTypography>
                </Flex>
                <Switch
                    isChecked={isExpanded}
                    onChange={onToggle}
                    sx={{
                        ".chakra-switch__track": { bgColor: "#878787" },
                        ".chakra-switch__thumb": { bgColor: "#1C1C1C" }
                    }}
                />
            </Flex>

            {isExpanded && children && <Box mt={6}>{children}</Box>}
        </>
    )
}

export default ToggleableSection