import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import { useFormikContext } from 'formik'
import { AnimatePresence, motion } from 'framer-motion'
import useAppToast from 'functions/hooks/toast/useToast'
import { ISettings } from 'pages/settings/formConfigs'
import React from 'react'
import { handleValidations } from '../../validationHandlers'

const MotionFlex = motion(Flex)

export default function SaveChangesDrawer() {
    const { dirty, handleSubmit, resetForm, isSubmitting, values } = useFormikContext<ISettings>()
    const { showToast } = useAppToast()

    const handleSaveClick = () => {
        const isValid = handleValidations({ values, showToast })
        if (isValid) {
            handleSubmit();
        }
    }

    return (
        <AnimatePresence initial={false}>
            {dirty && (
                <MotionFlex
                    // TODO: Replace AnimatePresence and MotionFlex with Chakra UI's Slide component for smoother transitions.
                    // Refer to the Chakra UI documentation for Slide component: https://v2.chakra-ui.com/docs/components/transitions
                    position="fixed" // TODO: Do not use {} for simple string values in Chakra UI props
                    bottom={0} // TODO: Follow CSS box model for sorting properties (margin, padding, border, width, height, position, etc.)
                    left={0}
                    flexDir={{ base: "column", lg: "row" }} // TODO: Group related properties together (flex-related properties, like flexDir, gap, etc.)
                    gap={{ base: 6, lg: 0 }}
                    justifyContent="space-between"
                    width="100%"
                    bg="#141414"
                    borderTop="1px solid #292929"
                    p={6} // TODO: Follow CSS box model order, and make sure padding comes after margin/border/width/height
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "tween", duration: 0.2 }}
                >
                    <Flex flexDir={{ base: "column", lg: "row" }} gap={4} alignItems={{ base: "start", lg: "center" }}>
                        <Box
                            p="10px"
                            bg="#1C1C1C"
                            border="1px solid #292929"
                            borderRadius="8px"
                        >
                            <AppIcons.WhiteSave style={{ width: "20px", height: "20px" }} />
                        </Box>
                        <Flex flexDir="column">
                            <AppTypography color="#fff" fontSize={14} fontWeight={700}>
                                Settings have changed!
                            </AppTypography>
                            <AppTypography color="#B1B1B1" fontSize={12}>
                                There are unsaved changes in the settings. Would you like to apply the new changes?
                            </AppTypography>
                        </Flex>
                    </Flex>
                    <Flex gap={4}>
                        <Button
                            isDisabled={isSubmitting}
                            fontSize={14}
                            fontWeight={500}
                            variant="secondary"
                            onClick={() => resetForm()}
                        >
                            Discard
                        </Button>
                        <Button
                            isLoading={isSubmitting}
                            width={{ base: "80%", lg: "max-content" }}
                            fontSize={14}
                            fontWeight={500}
                            onClick={handleSaveClick}
                        >
                            Save Changes
                        </Button>
                    </Flex>
                </MotionFlex>
            )}
        </AnimatePresence>
    )
}