import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ClipboardText from 'components/common/clipboardText/ClipboardText';

interface Props {
    clientId: string;
}

export default function ClientIdDisplay({ clientId }: Props) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Flex alignItems={"center"} gap={6}>
            <Flex gap={"2px"}>
                <AnimatePresence mode="wait">
                    {isVisible ? (
                        <motion.div
                            key="clientId"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <AppTypography minWidth={"200px"} fontSize={"13px"} fontWeight={"500"} color={"#fff"}>
                                {clientId}
                            </AppTypography>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="asterisks"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Flex gap={"1px"} minWidth={"200px"}>
                                {clientId.split("").map((_, index) => (
                                    index < 22 &&
                                    <AppIcons.Asterisk
                                        key={index}
                                        stroke='#fff'
                                        style={{ width: "8px", height: "8px" }}
                                    />
                                ))}
                            </Flex>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Flex>
            <Flex alignItems={"center"} gap={4}>
                <ClipboardText text={clientId} />
                <Box onClick={() => setIsVisible(!isVisible)} cursor="pointer">
                    {isVisible ? (
                        <AppIcons.Eye style={{ width: "20px", height: "20px" }} stroke='#fff' />
                    ) : (
                        <AppIcons.HidedIcon stroke='#fff' />
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
