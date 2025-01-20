import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFormikContext } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { ISettings } from 'pages/settings/formConfigs'

const MotionFlex = motion(Flex)

export default function SaveChangesDrawer() {
    const { dirty, handleSubmit, resetForm, isSubmitting, values } = useFormikContext<ISettings>()
    const { showToast } = useAppToast()
    const handleSaveClick = () => {
        //we ensure that the total percentage of the wallets does not exceed 100
        const walletOverLimit = values.paymentWallets.find((wallet) => {
            const sumPercent = wallet.destinationAddress.reduce((sum, d) => sum + (d.percent || 0), 0);
            return sumPercent > 100;
        });
        const walletType = walletOverLimit?.type === "SOL" ? "Solana" : "EVM"
        if (walletOverLimit) {
            showToast({
                type: "error",
                message: `Please double-check your ${walletType} wallets section, the total percentage must not exceed 100.`,
                options: { autoClose: 5000 }
            });
            return;
        }

        handleSubmit();
    }

    const handleDiscardClick = () => {
        resetForm()
    }

    return (
        <AnimatePresence initial={false}>
            {dirty && <MotionFlex
                position={"fixed"}
                bottom={0}
                left={0}
                flexDir={{ base: "column", lg: "row" }}
                gap={{ base: 6, lg: 0 }}
                justifyContent={"space-between"}
                width={"100%"}
                bg={"#141414"}
                borderTop={"1px solid #292929"}
                p={6}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "tween", duration: 0.2 }}
            >
                <Flex flexDir={{ base: "column", lg: "row" }} gap={4} alignItems={{ base: "start", lg: "center" }}>
                    <Box p={"10px"} bg={"#1C1C1C"} border={"1px solid #292929"} borderRadius={"8px"}>
                        <AppIcons.WhiteSave style={{ width: "20px", height: "20px" }} />
                    </Box>
                    <Flex flexDir={"column"}>
                        <AppTypography color={"#fff"} fontSize={14} fontWeight={700}>
                            Settings have changed!
                        </AppTypography>
                        <AppTypography color={"#B1B1B1"} fontSize={12}>
                            There are unsaved changes in the settings. Would you like to apply the new changes?
                        </AppTypography>
                    </Flex>
                </Flex>
                <Flex gap={4}>
                    <Button isDisabled={isSubmitting} onClick={handleDiscardClick} fontSize={14} fontWeight={500} variant='secondary'>Discard</Button>
                    <Button isLoading={isSubmitting} onClick={handleSaveClick} width={{ base: "80%", lg: "max-content" }} fontSize={14} fontWeight={500}>Save Changes</Button>
                </Flex>
            </MotionFlex>
            }
        </AnimatePresence>
    )
}
