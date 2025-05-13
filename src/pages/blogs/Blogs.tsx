import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/debounce/useDebounce'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogTable from './components/BlogTable/BlogTable'

function Blogs() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Blog Posts"
                description="Here you can create, edit and manage posts related to your blog."
                actionButtons={[
                    { title: "New Post", leftIcon: <PlusMd color="#000" />, onClick: () => navigate("new") }
                ]}
            />
            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value)
                }}
            />
            <PageGrid.Content>
                <BlogTable searchTerm={debouncedSearchTerm} />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default Blogs