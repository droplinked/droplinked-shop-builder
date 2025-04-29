import Textarea from 'components/redesign/textarea/Textarea'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function SearchEngineSummary() {
    const { values, setFieldValue } = useBlogForm()

    return (
        <Textarea
            label='Search Engine Summary'
            description='Include 150-200 words about the post to display on search engines as the content summary.'
            placeholder='Search Engine Summary'
            value={values.searchEngineSummary}
            onChange={(e) => setFieldValue("searchEngineSummary", e.target.value)}
        />
    )
}

export default SearchEngineSummary