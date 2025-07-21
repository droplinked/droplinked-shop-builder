import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import BlueButton from 'components/redesign/button/BlueButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/invoice-management/ar.json'
import enLocale from 'locales/invoice-management/en.json'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function InvoicesEmptyState() {
    const { t } = useLocaleResources('invoice-management', { en: enLocale, ar: arLocale });
    const navigate = useNavigate()

    return (
        <Flex mt={12} direction={"column"} alignItems={"center"}>
            <AppImage
                width='220px'
                height='260px'
                src='https://upload-file-droplinked.s3.amazonaws.com/8043d6e41e03dcb155f33d2a2ccde56ddcb02819e4e1c998e3285a271c3aeb24.png'
                objectFit='cover'
                borderRadius={8}
                alt={t('InvoicesEmptyState.alt')}
            />
            <AppTypography mt={16} fontSize={24} fontWeight={500} color={"white"}>{t('InvoicesEmptyState.title')}</AppTypography>
            <AppTypography mt={2} fontSize={16} fontWeight={400} color={"white"}>{t('InvoicesEmptyState.description')}</AppTypography>
            <BlueButton
                sx={{ "svg path": { "stroke": "#2BCFA1" } }}
                color="#2BCFA1"
                paddingInline={4}
                paddingBlock={3}
                iconSpacing={1}
                fontSize={14}
                fontWeight={400}
                leftIcon={<AppIcons.BlackPlus />}
                mt={4}
                onClick={() => navigate("/analytics/invoice-management/create")}
            >
                {t('InvoicesEmptyState.newInvoice')}
            </BlueButton>
        </Flex>
    )
}

export default InvoicesEmptyState