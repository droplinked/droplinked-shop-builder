import { Flex } from '@chakra-ui/react'
import Button from 'components/redesign/button/Button'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogFormActions() {
    const navigate = useNavigate()
    const { values, setFieldValue, submitForm, isSubmitting } = useBlogForm()

    return (
        <Flex alignItems="center" gap={4}>
            <Button variant='secondary' onClick={() => navigate("/analytics/blogs")}>Discard</Button>
            <Button>Save as Draft</Button>
        </Flex>
    )
}

export default BlogFormActions