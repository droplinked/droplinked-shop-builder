import KeywordInput from 'components/redesign/keyword-input/KeywordInput'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function Keywords() {
    const { values, setFieldValue } = useBlogForm()

    return (
        <KeywordInput
            keywords={values.tags}
            onKeywordsChange={(keywords) => setFieldValue('tags', keywords)}
            label="Keywords"
            description='Add relevant tags to help users find posted content across search engines.'
            placeholder="Type keywords to help drive traffic to this post..."
        />
    )
}

export default Keywords