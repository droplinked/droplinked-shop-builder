import { PlusSm } from 'assets/icons/Sign/Plus/PlusSm'
import PageEmptyState from 'components/redesign/page-empty-state/PageEmptyState'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function BlogTableEmptyState() {
    const navigate = useNavigate()
    const { t } = useLocaleResources("blogs")

    return (
        <PageEmptyState
            image="https://upload-file-droplinked.s3.amazonaws.com/09cb061ba207cddb9eecf0befbd2e7a8a69f44d7ec1c83a7ed387da3f2651526.png"
            imageProps={{ width: "750px", height: "273px" }}
            title={t("BlogTable.emptyState.message")}
            action={{
                text: t("Blogs.newPost"),
                icon: <PlusSm color="#2BCFA1" />,
                onClick: () => navigate('/analytics/blogs/new')
            }}
        />
    )
}

export default BlogTableEmptyState