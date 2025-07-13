import useAppToast from 'hooks/toast/useToast'
import { Blog } from 'services/blog/interfaces'
import { createBlogService } from 'services/blog/services'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogForm from './BlogForm/BlogForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function BlogCreatePage() {
    const navigate = useNavigate()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("blogs")

    async function handleSubmit(blog: Blog) {
        try {
            await createBlogService(blog)
            showToast({ type: "success", message: t("notifications.created") })
            navigate("/analytics/blogs")
        } catch (error) {
            showToast({ type: "error", message: t("notifications.error.create") })
        }
    }

    return <BlogForm onSubmit={handleSubmit} />
}

export default BlogCreatePage