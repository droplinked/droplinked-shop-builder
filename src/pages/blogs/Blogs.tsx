import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import ButtonGrid from 'components/redesign/button-grid/ButtonGrid'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/debounce/useDebounce'
import React, { useState } from 'react'
import BlogTable from './components/BlogTable'

function Blogs() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm)

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title="Blog Posts"
                description="Here you can create, edit and manage posts related to your blog."
                rightContent={
                    <ButtonGrid buttons={[
                        {
                            caption: "New Post",
                            leftIcon: <PlusMd color="#000" />,
                            onClick: () => console.log("New Collection"),
                        }
                    ]}
                    />
                }
            />
            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                }}
            />
            <PageGrid.Content>
                <BlogTable searchTerm={debouncedSearchTerm} />
            </PageGrid.Content>
        </PageGrid.Root>
    )
}

export default Blogs