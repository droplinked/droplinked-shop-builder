import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogFormActions() {
    const navigate = useNavigate()
    const { values, submitForm, isSubmitting } = useBlogForm()

    const mainButtonText = values.isVisible ? 'Publish' : 'Save as Draft'

    return (
        <Flex alignItems="center" gap={4}>
            <Button
                variant='secondary'
                isDisabled={isSubmitting}
                onClick={() => navigate("/analytics/blogs")}
            >
                Discard
            </Button>
            <Button
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                onClick={submitForm}
            >
                {mainButtonText}
            </Button>
        </Flex>
    )
}

export default BlogFormActions