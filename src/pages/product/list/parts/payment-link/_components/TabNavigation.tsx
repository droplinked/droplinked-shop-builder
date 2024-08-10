import { Box, Flex } from '@chakra-ui/react';
import AppTypography from 'components/common/typography/AppTypography';
import { motion } from "framer-motion";
import React from 'react';

interface Props {
    currentTab: string;
    onTabChange: (tab: string) => void
}

function TabNavigation({ currentTab, onTabChange }: Props) {
    return (
        <Flex gap={6} mb={6} pb={2} borderBottom={"1px solid #3C3C3C"}>
            {["Share", "Customize"].map((tab, index) => (
                <Box key={index} position="relative" cursor={"pointer"}>
                    <AppTypography
                        fontSize={16}
                        fontWeight={tab === currentTab ? 500 : 400}
                        color={tab === currentTab ? "#fff" : "#7B7B7B"}
                        transition={"all 0.2s"}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab}
                    </AppTypography>
                    {tab === currentTab && (
                        <motion.div
                            layoutId="underline"
                            transition={{ duration: 0.2 }}
                            style={{
                                position: "absolute",
                                bottom: -9,
                                left: 0,
                                right: 0,
                                height: "2px",
                                borderRadius: "2px",
                                backgroundColor: "#fff",
                            }}
                        />
                    )}
                </Box>
            ))}
        </Flex>
    )
}

export default TabNavigation