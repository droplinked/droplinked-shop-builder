import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogFormActions() {
    const navigate = useNavigate()
    const { values, submitForm, isSubmitting } = useBlogForm()
    const { t } = useLocaleResources("blogs")

    const mainButtonText = values.isVisible ? t("BlogFormActions.publish") : t("BlogFormActions.saveDraft")

    return (
        <Flex alignSelf="flex-end" alignItems="center" gap={4}>
            <AppButton
                variant='secondary'
                isDisabled={isSubmitting}
                onClick={() => navigate("/analytics/blogs")}
            >
                {t("common:discard")}
            </AppButton>
            <AppButton
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                onClick={submitForm}
            >
                {mainButtonText}
            </AppButton>
        </Flex>
    )
}

export default BlogFormActions