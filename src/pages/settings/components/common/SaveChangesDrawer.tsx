import { Box, Flex, Slide } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import { useFormikContext } from 'formik'
import useAppToast from 'functions/hooks/toast/useToast'
import { ISettings } from 'pages/settings/formConfigs'
import React from 'react'
import { handleValidations } from '../../validationHandlers'

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
        <Slide direction="bottom" in={dirty} style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
            <Flex
                width="100%"
                padding={6}
                background="#141414"
                borderTop="1px solid #292929"
                flexDirection={{ base: "column", lg: "row" }}
                justifyContent="space-between"
                gap={{ base: 6, lg: 0 }}
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
            </Flex>
        </Slide>
    )
}