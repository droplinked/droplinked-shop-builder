import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import React, { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useFormikContext } from 'formik'

const MotionFlex = motion(Flex)

export default function SaveChangesDrawer() {
    const { dirty, handleSubmit, values, errors, resetForm, isSubmitting } = useFormikContext()

    const handleSaveClick = () => {
        handleSubmit()
    }

    const handleDiscardClick = () => {
        resetForm()
    }

    useEffect(() => {
        console.log("errors", errors)
        console.log("values", values)
    }, [errors, values])

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
