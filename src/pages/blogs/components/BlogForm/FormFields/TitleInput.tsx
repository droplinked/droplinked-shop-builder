import Input from 'components/redesign/input/Input'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function TitleInput() {
    const { values, setFieldValue } = useBlogForm()

    return (
        <Input
            label='Title'
            description='Choose a clear and compelling title for the post.'
            inputProps={{
                isRequired: true,
                placeholder: 'e.g., Handmade Ceramic Mug',
                value: values.title,
                onChange: (e) => setFieldValue('title', e.target.value),
                "aria-label": "Blog title"
            }}
        />
    )
}

export default TitleInput