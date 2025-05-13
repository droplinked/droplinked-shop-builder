import { Flex } from '@chakra-ui/react'
import AppButton from 'components/redesign/button/AppButton'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogFormActions() {
    const navigate = useNavigate()
    const { values, submitForm, isSubmitting } = useBlogForm()

    const mainButtonText = values.isVisible ? 'Publish' : 'Save as Draft'

    return (
        <Flex alignSelf="flex-end" alignItems="center" gap={4}>
            <AppButton
                variant='secondary'
                isDisabled={isSubmitting}
                onClick={() => navigate("/analytics/blogs")}
            >
                Discard
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