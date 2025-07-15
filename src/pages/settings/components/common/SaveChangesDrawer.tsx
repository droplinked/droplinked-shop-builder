import { Box, Flex, Slide } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import { useFormikContext } from 'formik'
import useAppToast from 'hooks/toast/useToast'
import { ISettings } from 'pages/settings/utils/formConfigs'
import React from 'react'
import { handleValidations } from '../../utils/validationHandlers'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function SaveChangesDrawer() {
    const { dirty, handleSubmit, resetForm, isSubmitting, values } = useFormikContext<ISettings>()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources('settings')

    const handleSaveClick = () => {
        const isValid = handleValidations({ values, showToast, t })
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
                borderTop="1px solid"
                borderColor="neutral.gray.800"
                flexDirection={{ base: "column", lg: "row" }}
                justifyContent="space-between"
                gap={{ base: 6, lg: 0 }}
            >
                <Flex flexDir={{ base: "column", lg: "row" }} gap={4} alignItems={{ base: "start", lg: "center" }}>
                    <Box
                        p="10px"
                        bg="neutral.gray.1000"
                        border="1px solid"
                        borderColor="neutral.gray.800"
                        borderRadius="8px"
                    >
                        <AppIcons.WhiteSave style={{ width: "20px", height: "20px" }} />
                    </Box>
                    <Flex flexDir="column">
                        <AppTypography color="#fff" fontSize={14} fontWeight={700}>
                            {t("settings.saveChanges.title")}
                        </AppTypography>
                        <AppTypography color="#B1B1B1" fontSize={12}>
                            {t("settings.saveChanges.description")}
                        </AppTypography>
                    </Flex>
                </Flex>
                <Flex gap={4}>
                    <AppButton
                        variant="secondary"
                        isDisabled={isSubmitting}
                        onClick={() => resetForm()}
                    >
                        {t("cancel")}
                    </AppButton>
                    <AppButton
                        isLoading={isSubmitting}
                        width={{ base: "80%", lg: "max-content" }}
                        onClick={handleSaveClick}
                    >
                        {t("settings.saveChanges.save")}
                    </AppButton>
                </Flex>
            </Flex>
        </Slide>
    )
}