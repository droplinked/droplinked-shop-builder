import { Box, Flex } from '@chakra-ui/react';
import AppIcons from 'assest/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography';
import useAppToast from 'functions/hooks/toast/useToast';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
    clientId: string;
}

export default function ClientIdDisplay({ clientId }: Props) {
    const [isVisible, setIsVisible] = useState(false);
    const { showToast } = useAppToast();

    const handleCopy = () => {
        showToast({ message: "Client ID copied to clipboard", type: "success" });
        navigator.clipboard.writeText(clientId);
    };

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
                            <AppTypography fontSize={"16px"} fontWeight={"500"} color={"#fff"}>
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
                            <Flex gap={"2px"}>
                                {clientId.split("").map((_, index) => (
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
                <Box onClick={handleCopy} cursor="pointer">
                    <AppIcons.Copy />
                </Box>
                <Box onClick={() => setIsVisible(!isVisible)} cursor="pointer">
                    {isVisible ? (
                        <AppIcons.Eye stroke='#fff' />
                    ) : (
                        <AppIcons.HidedIcon stroke='#fff' />
                    )}
                </Box>
            </Flex>
        </Flex>
    );
}
