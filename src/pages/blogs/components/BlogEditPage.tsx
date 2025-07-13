import FullScreenLoading from 'components/redesign/fullscreen-loading/FullScreenLoading'
import useAppToast from 'hooks/toast/useToast'
import { Blog } from 'services/blog/interfaces'
import { updateBlogService } from 'services/blog/services'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useBlog from '../hooks/useBlog'
import BlogForm from './BlogForm/BlogForm'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

function BlogEditPage() {
    const navigate = useNavigate()
    const { isFetching, data } = useBlog()
    const { showToast } = useAppToast()
    const { t } = useLocaleResources("blogs")

    const blog = data?.data

    async function handleSubmit(blog: Blog) {
        try {
            await updateBlogService(blog)
            showToast({ type: "success", message: t("notifications.updated") })
            navigate("/analytics/blogs")
        } catch (error) {
            showToast({ type: "error", message: t("notifications.error.update") })
        }
    }

    if (isFetching) return <FullScreenLoading />

    return <BlogForm blog={blog} onSubmit={handleSubmit} />
}

export default BlogEditPage