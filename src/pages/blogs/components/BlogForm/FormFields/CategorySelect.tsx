import Select from 'components/redesign/select/Select'
import useBlogForm from 'pages/blogs/hooks/useBlogForm'
import React, { useState } from 'react'

function CategorySelect() {
    const { } = useBlogForm()
    const [selectedCategory, setSelectedCategory] = useState(null)

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
                value: selectedCategory,
                onChange: (e) => setSelectedCategory(e.target.value)
            }}
        />
    )
}

export default CategorySelect