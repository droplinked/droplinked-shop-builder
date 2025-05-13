import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import SwitchBox from 'pages/products/components/ProductDrawer/components/common/SwitchBox'
import React from 'react'

function BlogToggles() {
    const { values, setFieldValue } = useBlogForm()

    return (
        <SwitchBox
            title='Featured'
            description='Pin the post on the header.'
            switchProps={{
                isChecked: values.isFeatured,
                onChange: (e) => setFieldValue('isFeatured', e.target.checked)
            }}
        />
    )
}

export default BlogToggles