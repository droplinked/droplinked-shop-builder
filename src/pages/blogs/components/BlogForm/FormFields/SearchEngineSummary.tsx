import Textarea from 'components/redesign/textarea/Textarea'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React, { useState } from 'react'

function SearchEngineSummary() {
    const { values, setFieldValue } = useBlogForm()
    const [searchEngineSummary, setSearchEngineSummary] = useState<string>('')

    return (
        <Textarea
            label='Search Engine Summary'
            description='Include 150-200 words about the post to display on search engines as the content summary.'
            placeholder='Search Engine Summary'
            value={searchEngineSummary}
            onChange={(e) => setSearchEngineSummary(e.target.value)}
        />
    )
}

export default SearchEngineSummary