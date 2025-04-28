import Select from 'components/redesign/select/Select'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React from 'react'

function CategorySelect() {
    const { values, setFieldValue } = useBlogForm()

    const categories = [
        { id: 1, name: 'Category 1' },
        { id: 2, name: 'Category 2' },
        { id: 3, name: 'Category 3' },
    ]

    return (
        <Select
            label='Category'
            description='Select a relevant category for organization and improve discoverability.'
            items={categories}
            valueAccessor="id"
            labelAccessor="name"
            selectProps={{
                placeholder: "Select a Category",
                value: values.category,
                onChange: (e) => setFieldValue("category", e.target.value)
            }}
        />
    )
}

export default CategorySelect