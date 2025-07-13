import { PlusMd } from 'assets/icons/Sign/Plus/PlusMd'
import PageGrid from 'components/redesign/page-grid/PageGrid'
import useDebounce from 'hooks/useDebounce/useDebounce'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogTable from './components/BlogTable/BlogTable'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import arLocale from 'locales/blogs/ar.json'
import enLocale from 'locales/blogs/en.json'

function Blogs() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("")
    const { t } = useLocaleResources("blogs", {
        ar: arLocale,
        en: enLocale
    })
    const debouncedSearchTerm = useDebounce(searchTerm)

    return (
        <PageGrid.Root>
            <PageGrid.Header
                title={t("title")}
                description={t("description")}
                actionButtons={[
                    { title: "New Post", leftIcon: <PlusMd color="#000" />, onClick: () => navigate("new") }
                ]}
            />
            <PageGrid.Actions
                search={{
                    value: searchTerm,
                    placeholder: t("search"),
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